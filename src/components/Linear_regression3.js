import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import axios from 'axios'
import { PredictActions } from '../redux/predict/action'
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
const Linear_regression3 = (props) => {
    const {
        dataArray
    } = props;
    const actionDataArray = bindActionCreators(PredictActions, useDispatch());
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
                if (data === "Recovered") {
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
                    else if (data === "Recovered") {
                        PlotPredictCount.push(dataName[data])
                    }
                }
            })
        }

    });
    console.log(CountNewConfirmed)
    const Days = tf.tensor1d([0, 1, 2, 3, 4, 5, 6, 7]);
    const NewConfirmed = tf.tensor1d([1689, 1787, 1928, 1999, 2108, 2352, 2430, 2490]);
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
    const LearningRate = 0.03333;
    const optimizer = tf.train.sgd(LearningRate);
    for (let round = 0; round < 300; round++) {
        optimizer.minimize(() => {
            const PredictNewConfirmed = Predict(Days)
            return error(NewConfirmed, PredictNewConfirmed)
        })
    }
    let PredictNewConfirmed_After = Predict(Days)
    console.log('#############')
    error(NewConfirmed, PredictNewConfirmed_After).print()
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
    let DataArray = [];
    let oneRound = 0;
    PlotPredictData.map((data, index) => {
        let dataA = { DateDay: data, Recovered: PlotPredictCount[index] };
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
                <Line type="monotone" dataKey="Recovered" stroke="#00c2ff" activeDot={{ r: 8 }} />
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
                <Line type="monotone" dataKey="Recovered" stroke="#00c2ff" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    )
    return (
        <div className="d-flex justify-content-center">
            <div>
                {G1}
                {G2}
            </div>
        </div>
    )
}
export default Linear_regression3;