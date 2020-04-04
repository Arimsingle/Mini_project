import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
const tatalKeyArray = ['confirmed', 'recovered', 'deaths'];
const Chart = (props) => {
    const {
        location: { country, province, latest },
        onCLickClose
    } = props;
    let title = country;
    if (province !== '' && province !== country) {
        title = `${province}, ${country}`;
    }
    const totalElements = tatalKeyArray.map((key, index) => {
        const count = latest[key];
        const data = [{ name: key.toUpperCase(), Covid: count, pv: 10, amt: 10 }];
        const colorArray = ['#ffcf00', '#7cbb15', 'red']
        return (
            <BarChart key={index} width={200} height={250} data={data}>
                <XAxis dataKey="name" stroke={`${colorArray[index]}`} />
                <YAxis />
                <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
                <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
                <Bar dataKey="Covid" fill={`${colorArray[index]}`} barSize={30} />
            </BarChart>
        )
    })
    return (

        <div className="list-view2">
            <strong className="d-flex justify-content-center">Covid-19 Graph</strong>
            <div className="d-flex flex-column bd-highlight mb-3">{totalElements}</div>
        </div>

    )
}
export default Chart