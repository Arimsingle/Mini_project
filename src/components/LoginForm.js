import React, { useState, useEffect } from 'react';
import { firestore } from '../index'
import { Form, Button, Modal } from 'react-bootstrap';
import * as firebase from 'firebase';
const LoginForm = (props) => {
    useEffect(() => {
        Data_firebase();
        Session();
    }, [])
    const {
        setLogined
    } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Users = e => {
        e.preventDefault();
        firestore.collection('Users').doc(email).set({ email, password })
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
    const Login = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
            setLogined(true);
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }
    const Data_firebase = () => {
        firestore.collection('Users').onSnapshot((snapshot) => {
            let tasksfirebase = snapshot.docs.map(data => {
            })
        })
    }
    const Session = () => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setLogined({
                    isLoggedIn: true,
                    currentUser: user,
                    errorMessage: null,
                });
                // ...
            } else {
                setLogined({
                    isLoggedIn: false,
                    currentUser: null,
                    errorMessage: null,
                });
            }
        });
    }
    return (
        <div className="d-flex justify-content-center">
            {ModalAlert}
            <Form style={{ width: "300px" }}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={Users}>
                    Submit
                </Button>
                <Button variant="primary" type="submit" onClick={Login}>
                    Login
                </Button>
            </Form>
        </div>
    )
}
export default LoginForm;