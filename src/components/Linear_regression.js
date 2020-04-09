import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
const Linear_regression = (props) => {
    const {
        dataArray
    } = props;
    const data = [
        { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
        { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
        { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
        { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
        { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
        { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
        { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    ];
    const [NumberPredict, setNumberPredict] = useState(null);
    let CountDate = [];
    let DataNewConfirmed = [];
    let CountNewConfirmed = [];
    let DateDay = [];
    let PlotPredictCount = [];
    const PlotPredictData = [];
    let LastIndex = [...dataArray].length;
    let SelectIndex = LastIndex - 16;
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
                if (indexParent > SelectIndex + 12) {
                    if (data === 'Date') {
                        DateDay.push(dataName[data])
                    }
                }
                if (indexParent > SelectIndex + 10) {
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
    const Days = tf.tensor1d([0, 1, 2, 3, 4, 5, 6, 7]);
    const NewConfirmed = tf.tensor1d([15, 19, 20, 23, 26, 27, 30, 32]);
    console.log("-----------------DATA-----------------");
    Days.print();
    NewConfirmed.print();
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
    console.log("-----------------PREDICT-----------------");
    PredictNewConfirmed_Before.print();
    console.log("-----------------ERROR-----------------");
    error(NewConfirmed, PredictNewConfirmed_Before).print();
    const LearningRate = 0.0335;
    const optimizer = tf.train.sgd(LearningRate);
    for (let round = 0; round < 300; round++) {
        optimizer.minimize(() => {
            const PredictNewConfirmed = Predict(Days)
            return error(NewConfirmed, PredictNewConfirmed)
        })
    }
    const PredictNewConfirmed_After = Predict(Days)
    console.log("-----------------PREDICT-----------------");
    PredictNewConfirmed_After.toInt().print();
    console.log("-----------------ERROR-----------------");
    error(NewConfirmed, PredictNewConfirmed_After).print();
    PredictNewConfirmed_After.data().then(data => console.log(data));
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
    console.log(PlotPredictCount);
    console.log(PlotPredictData);
    let DataArray = [];
    PlotPredictData.map((data, index) => {
        let dataA = { name: data, Count: PlotPredictCount[index] };
        DataArray.push(dataA)
    })
    console.log(DataArray)
    return (
        <div className="d-flex justify-content-center">
            {/* {Predict_One.map((data, index) => {
                return <p key={index}>04/{`${Day}`}/2020 : {data}</p>
            })} */}
            <div>
                <LineChart width={900} height={300} data={DataArray}
                    margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="10 10" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Count" stroke="#00c2ff" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
        </div>
    )
}
export default Linear_regression;
{/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */ }