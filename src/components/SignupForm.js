import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Card } from 'react-bootstrap';
import * as firebase from 'firebase';
import { firestore } from '../index'
import Wellcome from '../svg/undraw_welcome_cats_thqn.svg'
import Backgroud from '../svg/undraw_researching_22gp.svg'
const SignupForm = (props) => {
    const { setDisSignup } = props;
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [male, setMale] = useState('');
    const [female, setFemale] = useState('');
    const [age, setAge] = useState('');
    const [province, setProvince] = useState('');
    const [back, setBack] = useState(true);
    const [dataArray, setDataArray] = useState([]);
    useEffect(() => {
        Data_firebase();
    }, [])
    const Data_firebase = () => {
        firestore.collection('Users').onSnapshot((snapshot) => {
            let tasksfirebase = snapshot.docs.map(data => {
                console.log(data.data())
                return data.data().email
            })
            setDataArray(tasksfirebase)
        })
    }
    console.log(dataArray)
    let pass = false;
    const SignUPUsers = () => {
        dataArray.map((data, index) => {
            if (data === email) {
                pass = true;
            }
        })
        if (email.length >= 6 && password >= 6 && name !== '' && lastname !== '' && age !== '' && province !== '') {
            if (!pass) {
                firestore.collection('Users').doc(email).set({ name, lastname, email, password, male, female, age, province }).catch((error) => {
                    console.log(error);
                })
                firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                });
                alert("Register Success")
            } else
                alert("repeatedly Email")
        } else {
            alert("Incorrect information entered");
        }
    }
    return (
        <div>
            <div className="test-head-login2">
                <div className="d-flex justify-content-center">
                    <div className="flex-photo">
                        <img className="photo-s" src={Backgroud} />
                        <div className="d-flex justify-content-center">
                            <Card>
                                <Card.Body className="box-width3">
                                    <Card.Title>Register</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Arima Developer</Card.Subtitle>
                                    <Card.Text>
                                        <Form className="box-width4">
                                            <Form.Row>
                                                <Form.Group as={Col}>
                                                    <Form.Label>Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} />
                                                </Form.Group>

                                                <Form.Group as={Col}>
                                                    <Form.Label>Last-Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Lastname" onChange={(e) => setLastname(e.target.value)} />
                                                </Form.Group>
                                            </Form.Row>

                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                                            </Form.Group>
                                            <Form.Group id="formGridCheckbox">
                                                <Form.Label>Gender</Form.Label>
                                                <div style={{ display: "flex" }}>
                                                    <Form.Check type="checkbox" value="Male" label="Male" onClick={(e) => setMale(e.target.value)} />
                                                    <Form.Check style={{ margin: "0 0 0 10px" }} type="checkbox" value="Female" label="Female" onClick={(e) => setFemale(e.target.value)} />
                                                </div>
                                            </Form.Group>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="formGridCity">
                                                    <Form.Label>Age</Form.Label>
                                                    <Form.Control placeholder="Enter Age" onChange={(e) => setAge(e.target.value)} />
                                                </Form.Group>
                                                <Form.Group as={Col} controlId="formGridZip">
                                                    <Form.Label>Province</Form.Label>
                                                    <Form.Control placeholder="Enter Province" onChange={(e) => setProvince(e.target.value)} />
                                                </Form.Group>
                                            </Form.Row>
                                            <div className="d-flex justify-content-between">
                                                <Button variant="outline-info" onClick={SignUPUsers}>
                                                    Sign Up
                                        </Button>
                                                {
                                                    back && <Button variant="outline-info" onClick={() => setDisSignup(false)}>
                                                        Back to Login
                                            </Button>
                                                }
                                            </div>
                                        </Form>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignupForm;