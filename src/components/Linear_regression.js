import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import axios from 'axios'
import { PredictActions } from '../redux/predict/action'
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import Linear_regression2 from './Linear_regression2';
import Linear_regression3 from './Linear_regression3';
const Linear_regression = (props) => {
    const {
        dataArray
    } = props;
    const dataArray2 = dataArray;
    const actionDataArray = bindActionCreators(PredictActions, useDispatch());
    const [NumberPredict, setNumberPredict] = useState(null);
    let CountDate = [];
    let DataNewConfirmed = [];
    let CountNewConfirmed = [];
    let DateDay = [];
    let PlotPredictCount = [];
    const PlotPredictData = [];
    let LastIndex = [...dataArray].length;
    let SelectIndex = LastIndex - 9;
    [...dataArray].map((data, index) => {
        if (index < (LastIndex - SelectIndex) - 1)
            CountDate.push(index);
        DataNewConfirmed.push(data);
    });
    [...DataNewConfirmed].map((dataName, indexParent) => {
        if (indexParent > SelectIndex) {
            Object.keys(dataName).map(data => {
                if (data === "Deaths") {
                    CountNewConfirmed.push(dataName[data])
                }
                if (indexParent > SelectIndex + 6) {
                    if (data === 'Date') {
                        DateDay.push(dataName[data])
                    }
                }
                if (indexParent > SelectIndex + 6) {
                    if (data === 'Date') {
                        PlotPredictData.push(dataName[data])
                    }
                    else if (data === "Deaths") {
                        PlotPredictCount.push(dataName[data])
                    }
                }
            })
        }

    });
    console.log("-----------------------CountNewConfirmed--------------------")
    console.log([...CountNewConfirmed])
    const Days = tf.tensor1d([0, 1, 2, 3, 4, 5, 6, 7]);
    const NewConfirmed = tf.tensor1d([27, 30, 32, 33, 35, 38, 40, 41]);
    // console.log("-----------------DATA-----------------");
    // Days.print();
    // NewConfirmed.print();
    const m = tf.variable(tf.scalar(Math.random()));
    m.print()
    const b = tf.variable(tf.scalar(Math.random()));
    b.print()
    const Predict = (Days) => {
        return tf.tidy(() => {
            return Days.mul(m).add(b)
        })
    }
    const error = (NewConfirmed, PredictNewConfirmed) => {
        return NewConfirmed.sub(PredictNewConfirmed).square().mean();
    }
    const PredictNewConfirmed_Before = Predict(Days)
    // console.log("-----------------PREDICT-----------------");
    // PredictNewConfirmed_Before.print();
    // console.log("-----------------ERROR-----------------");
    // error(NewConfirmed, PredictNewConfirmed_Before).print();
    const LearningRate = 0.0335;
    const optimizer = tf.train.sgd(LearningRate);
    for (let round = 0; round < 300; round++) {
        optimizer.minimize(() => {
            const PredictNewConfirmed = Predict(Days)
            return error(NewConfirmed, PredictNewConfirmed)
        })
    }
    const PredictNewConfirmed_After = Predict(Days)
    // console.log("-----------------PREDICT-----------------");
    // PredictNewConfirmed_After.toInt().print();
    // console.log("-----------------ERROR-----------------");
    // error(NewConfirmed, PredictNewConfirmed_After).print();
    // PredictNewConfirmed_After.data().then(data => console.log(data));
    let Answer = null;
    let Arr = []
    let Predict_One = [];
    Answer = Predict(tf.tensor1d([8, 9, 10])).toInt();
    Arr = Answer.dataSync();
    Predict_One = [Arr[0], Arr[1], Arr[2]];
    var Day = '';
    DateDay.map((data, index) => {
        var res = data.split("/");
        Day = res[1]
    })
    Predict_One.map((data, index) => {
        var Zero = '';
        var str = '';
        Day = parseInt(Day) + 1;
        if (Day.toString().charAt(0) === "0") {
            Zero = 0;
        }
        Day = Zero + Day.toString()
        Day = Day;
        str = `04/${Day}/2020`;
        PlotPredictData.push(str);
    })
    PlotPredictCount.push(...Predict_One);
    // console.log(PlotPredictCount);
    // console.log(PlotPredictData);
    let DataArray = [];
    let oneRound = 0;
    PlotPredictData.map((data, index) => {
        let dataA = { DateDay: data, Deaths: PlotPredictCount[index] };
        // if (dataA.DateDay.charAt(3) !== "N")
        //     axios.post(`http://localhost/api/Predicts`, dataA).then(data => console.log(data)).catch(data => console.log(data))
        DataArray.push(dataA);
    })
    useEffect(() => {
        actionDataArray.getDateArray(DataArray)
    }, [])
    const G1 = (
        <div className="test22">
            <LineChart width={900} height={300} data={DataArray}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <XAxis dataKey="DateDay" />
                <YAxis />
                <CartesianGrid strokeDasharray="10 10" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Deaths" stroke="#00c2ff" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    )
    const G2 = (
        <div className="test2">
            <LineChart width={480} height={300} data={DataArray}
                margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <XAxis dataKey="DateDay" />
                <YAxis />
                <CartesianGrid strokeDasharray="10 10" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Deaths" stroke="#00c2ff" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    )
    return (
        <div>
            <div className="d-flex justify-content-center">
                <h5 className="text-smr-2">Deaths</h5>
            </div>
            <div className="d-flex justify-content-center">
                <div>
                    {G1}
                    {G2}
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <h5 className="text-smr-2">Confirmed</h5>
            </div>
            <div className="d-flex justify-content-center">
                <Linear_regression2 dataArray={dataArray2} />
            </div>
            <div className="d-flex justify-content-center">
                <h5 className="text-smr-2">Recovered</h5>
            </div>
            <div className="d-flex justify-content-center">
                <Linear_regression3 dataArray={dataArray2} />
            </div>
        </div>
    )
}
export default Linear_regression;
{/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */ }