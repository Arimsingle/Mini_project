import React, { useState, useEffect } from 'react';
import SignupForm from './SignupForm';
import { Form, Button, Card } from 'react-bootstrap';
import Wellcome from '../svg/undraw_welcome_cats_thqn.svg'
import Backgroud from '../svg/undraw_researching_22gp.svg'
import * as firebase from 'firebase';
const DisplayLogin = (props) => {
    const { setLogined, logined ,setGetData} = props;
    const [disSignup, setDisSignup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const LoginFirebase = () => {
        console.log(email, password)
        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
            setLogined(true);
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
    const DisLogin = (
        <div className="box-login">
            <div className="d-flex justify-content-center">
                <div style={{ margin: "0px 0px 50px 0" }}>
                    <h1>MINI PROJECT LOGIN</h1>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <div style={{ display: "flex" }}>
                    <div>
                        <Card>
                            <Card.Body>
                                <Card.Title>LOGIN</Card.Title>
                                <Card.Text>
                                    <Form className="box-width">
                                        <Form.Group>
                                            <Form.Label>EMAIL</Form.Label>
                                            <Form.Control type="email" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>PASSWORD</Form.Label>
                                            <Form.Control type="password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} />
                                        </Form.Group>
                                        <div className="d-flex justify-content-between">
                                            <Button variant="outline-info" onClick={LoginFirebase}>
                                                Login
                                </Button>
                                            <Button variant="outline-info" onClick={() => setDisSignup(true)}>
                                                Register
                                </Button>
                                        </div>
                                    </Form>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div>
                        <img src={Backgroud} className="bg-photo" />
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <div>
            {!disSignup && DisLogin}
            {disSignup && <SignupForm setDisSignup={setDisSignup} />}
        </div>
    )
}
export default DisplayLogin;