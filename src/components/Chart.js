import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Table, Button, Card } from 'react-bootstrap';

const tatalKeyArray = ['confirmed', 'recovered', 'deaths'];
const Chart = (props) => {
    const [showInfo, setShowInfo] = useState(false);
    const [showInfoTD, setShowInfoTD] = useState(false);
    const {
        location: { country, province, latest },
        onCLickClose,
        Api_TH_PV,
        Api_TH_Today
    } = props;
    let title = country;
    if (province !== '' && province !== country) {
        title = `${province}, ${country}`;
    }
    const arr = [];
    tatalKeyArray.map((key, index) => {
        const count = latest[key];
        const data = [{ name: key.toUpperCase(), Covid: count }];
        arr.push(...data)
    })
    const RechartViews = (
        <BarChart width={400} height={300} data={arr} margin={{
            top: 5, right: 30, left: 20, bottom: 5,
        }
        }>
            <XAxis dataKey="name" stroke={'#000000'} />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
            <CartesianGrid stroke="#ccc" strokeDasharray="100 100" />
            <Bar dataKey="Covid" fill="#ffcf00" barSize={30} />
        </BarChart>
    )
    var Api_Obj = Object.keys(Api_TH_PV).map((data, index) => {
        return (
            <div key={index}>
                {index === 0 && <p>Population infected with Covid-19 in Thailand</p>}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Province</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{data}</td>
                            <td>{Api_TH_PV[data]}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    });
    var Api_Obj_Today = Object.keys(Api_TH_Today).map((data, index) => {
        return (
            <div key={index}>
                <Card border="warning" style={{ width: '18rem' }}>
                    <Card.Header>{data}</Card.Header>
                    <Card.Body>
                        <Card.Title>{Api_TH_Today[data]}</Card.Title>
                    </Card.Body>
                </Card>
                <br />
            </div>
        )
    })
    return (
        <div className="list-view2">
            <strong className="d-flex justify-content-center">Covid-19 Graph</strong>
            <div className="d-flex justify-content-center">
                {/* {country === "Thailand" && <Button className="margin-b" variant="outline-dark" onClick={() => setShowInfo(state => !state)}>{showInfo === true ? "See Grahp Of World" : "See Thailand Info"}</Button>} */}
                {/* {country === "Thailand" && <Button className="margin-b" variant="outline-dark" onClick={() => setShowInfoTD(state => !state)}>{showInfoTD === true ? "See Grahp Of World" : "See Thailand Today"}</Button>} */}
            </div>
            <div className="d-flex justify-content-center">
                <div className="flex-clm">
                    {country === "Thailand" ? Api_Obj : RechartViews}
                </div>
            </div>
        </div>
    )
}
export default Chart;