import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const Sub_Chart = (props) => {
    const {
        Api_TH_Today,
        Api_THGn
    } = props;
    const dataArray = [];
    const dataArray_Count = [];
    const dataGender = [];
    var DisplayToday = Object.keys(Api_TH_Today).map((data, index) => {
        if (index < 8) {
            if (Api_TH_Today[data] < 0) {
                Api_TH_Today[data] = 0;
            }
            dataArray.push({ Name: data, Count: Api_TH_Today[data] })
        }
        if (index <= 8) {
            dataArray_Count.push(Api_TH_Today[data])
        }
    })
    const DisplayToday_C = (
        <div className="test22">
            <h3 className="text-smr-2">Status of an infected person</h3>
            <div className="d-flex justify-content-center">
                <Card border="info" style={{ width: '15rem' }}>
                    <Card.Header>Confirmed</Card.Header>
                    <Card.Body>
                        <Card.Title>{dataArray_Count[0]}</Card.Title>
                    </Card.Body>
                </Card>&#160;&#160;&#160;&#160;&#160;&#160;
                <Card border="info" style={{ width: '15rem' }}>
                    <Card.Header>Recovered</Card.Header>
                    <Card.Body>
                        <Card.Title>{dataArray_Count[1]}</Card.Title>
                    </Card.Body>
                </Card>&#160;&#160;&#160;&#160;&#160;&#160;
                <Card border="info" style={{ width: '15rem' }}>
                    <Card.Header>Hospitalized</Card.Header>
                    <Card.Body>
                        <Card.Title>{dataArray_Count[2]}</Card.Title>
                    </Card.Body>
                </Card>&#160;&#160;&#160;&#160;&#160;&#160;
            </div>
            <br />
            <div className="d-flex justify-content-center">
                <Card border="info" style={{ width: '15rem' }}>
                    <Card.Header>Deaths</Card.Header>
                    <Card.Body>
                        <Card.Title>{dataArray_Count[3]}</Card.Title>
                    </Card.Body>
                </Card>&#160;&#160;&#160;&#160;&#160;&#160;
                <Card border="info" style={{ width: '15rem' }}>
                    <Card.Header>NewConfirmed</Card.Header>
                    <Card.Body>
                        <Card.Title>{dataArray_Count[4]}</Card.Title>
                    </Card.Body>
                </Card>&#160;&#160;&#160;&#160;&#160;&#160;
                <Card border="info" style={{ width: '15rem' }}>
                    <Card.Header>NewRecovered</Card.Header>
                    <Card.Body>
                        <Card.Title>{dataArray_Count[5]}</Card.Title>
                    </Card.Body>
                </Card>&#160;&#160;&#160;&#160;&#160;&#160;
            </div>
            <br />
            <div className="d-flex justify-content-center">
                <Card border="info" style={{ width: '15rem' }}>
                    <Card.Header>NewHospitalized</Card.Header>
                    <Card.Body>
                        <Card.Title>{dataArray_Count[6]}</Card.Title>
                    </Card.Body>
                </Card>&#160;&#160;&#160;&#160;&#160;&#160;
                <Card border="info" style={{ width: '15rem' }}>
                    <Card.Header>NewDeaths</Card.Header>
                    <Card.Body>
                        <Card.Title>{dataArray_Count[7]}</Card.Title>
                    </Card.Body>
                </Card>&#160;&#160;&#160;&#160;&#160;&#160;
                <Card border="info" style={{ width: '15rem' }}>
                    <Card.Header>UpdateDate</Card.Header>
                    <Card.Body>
                        <Card.Title>{dataArray_Count[8]}</Card.Title>
                    </Card.Body>
                </Card>&#160;&#160;&#160;&#160;&#160;&#160;
            </div>
            <br />
            <div>
                <h3 className="text-smr-2" id="Infected-Gender">Status of an infected Gender</h3>
                <div className="d-flex justify-content-around">
                    <div>
                        <img src="https://upload.wikimedia.org/wikipedia/en/b/bb/Male_Bathroom_Symbol.png" width="100px" alt="male" />
                        <p>Male:{Api_THGn.Male}</p>
                    </div>
                    <div>
                        <img src="https://pngimage.net/wp-content/uploads/2018/05/female-png-5.png" width="75px" alt="female" />
                        <p>Female:{Api_THGn.Female}</p>
                    </div>
                </div>
                <br />
            </div>
            <br />
        </div>
    )


    const DisplayToday_C2 = (
        <div className="test2">
            <h3 className="text-smr-2">Status of an infected person</h3>
            <div className="d-flex justify-content-center">
                <div className="flex-colunm">
                    <Card border="info" style={{ width: '15rem' }}>
                        <Card.Header>Confirmed</Card.Header>
                        <Card.Body>
                            <Card.Title>{dataArray_Count[0]}</Card.Title>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card border="info" style={{ width: '15rem' }}>
                        <Card.Header>Recovered</Card.Header>
                        <Card.Body>
                            <Card.Title>{dataArray_Count[1]}</Card.Title>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card border="info" style={{ width: '15rem' }}>
                        <Card.Header>Hospitalized</Card.Header>
                        <Card.Body>
                            <Card.Title>{dataArray_Count[2]}</Card.Title>
                        </Card.Body>
                    </Card>
                    <br />
                </div>
            </div>
            <br />
            <div className="d-flex justify-content-center">
                <div className="flex-colunm">
                    <Card border="info" style={{ width: '15rem' }}>
                        <Card.Header>Deaths</Card.Header>
                        <Card.Body>
                            <Card.Title>{dataArray_Count[3]}</Card.Title>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card border="info" style={{ width: '15rem' }}>
                        <Card.Header>NewConfirmed</Card.Header>
                        <Card.Body>
                            <Card.Title>{dataArray_Count[4]}</Card.Title>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card border="info" style={{ width: '15rem' }}>
                        <Card.Header>NewRecovered</Card.Header>
                        <Card.Body>
                            <Card.Title>{dataArray_Count[5]}</Card.Title>
                        </Card.Body>
                    </Card>
                    <br />
                </div>
            </div>
            <br />
            <div className="d-flex justify-content-center">
                <div className="flex-colunm">
                    <Card border="info" style={{ width: '15rem' }}>
                        <Card.Header>NewHospitalized</Card.Header>
                        <Card.Body>
                            <Card.Title>{dataArray_Count[6]}</Card.Title>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card border="info" style={{ width: '15rem' }}>
                        <Card.Header>NewDeaths</Card.Header>
                        <Card.Body>
                            <Card.Title>{dataArray_Count[7]}</Card.Title>
                        </Card.Body>
                    </Card>
                    <br />
                    <Card border="info" style={{ width: '15rem' }}>
                        <Card.Header>UpdateDate</Card.Header>
                        <Card.Body>
                            <Card.Title>{dataArray_Count[8]}</Card.Title>
                        </Card.Body>
                    </Card>
                    <br />
                </div>
            </div>
            <div>
                <h3 className="text-smr-2" id="Infected-Gender">Status of an infected Gender</h3>
                <div className="flex-colunm">
                    <div className="d-flex justify-content-center">
                        <div>
                            <img src="https://upload.wikimedia.org/wikipedia/en/b/bb/Male_Bathroom_Symbol.png" width="100px" alt="male" />
                            <p>Male:{Api_THGn.Male}</p>
                        </div>
                        <div>
                            <img src="https://pngimage.net/wp-content/uploads/2018/05/female-png-5.png" width="75px" alt="female" />
                            <p>Female:{Api_THGn.Female}</p>
                        </div>
                    </div>
                </div>
                <br />
            </div>
            <br />
        </div>
    )
    const G1 = (
        <div className="test22">
            <BarChart width={1050} height={300} data={dataArray}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Count" fill="#00c2ff" />
            </BarChart>
        </div>
    )
    const G2 = (
        <div className="test2">
            <BarChart width={480} height={300} data={dataArray}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Count" fill="#00c2ff" />
            </BarChart>
        </div>
    )
    return (
        <div>
            <h3 className="text-smr-2">Histrogram Grahp</h3>
            {G2}
            {G1}
            <div id="Infected-person"></div>
            {DisplayToday_C}
            {DisplayToday_C2}
        </div>
    )
}
export default Sub_Chart;