import * as tf from '@tensorflow/tfjs';
import React, { useState } from 'react';
import * as tmImage from '@teachablemachine/image'
import { Button } from 'react-bootstrap';

const Camera = () => {
    const [show, setShow] = useState([{}]);
    const URL = "https://teachablemachine.withgoogle.com/models/5ngUkUA-4/";
    let model, webcam, labelContainer, maxPredictions;
    const Webcam = () => {
        alert('กำลังเปิดกล้องอัจฉาริยะกรุณารอสักครู่');
        async function init() {
            const modelURL = URL + "model.json";
            const metadataURL = URL + "metadata.json";
            model = await tmImage.load(modelURL, metadataURL);
            maxPredictions = model.getTotalClasses();
            const flip = true;
            webcam = new tmImage.Webcam(350, 350, flip);
            await webcam.setup();
            await webcam.play();
            window.requestAnimationFrame(loop);
            document.getElementById("webcam-container").appendChild(webcam.canvas);
            labelContainer = document.getElementById("label-container");
            for (let i = 0; i < maxPredictions; i++) { // and class labels
                labelContainer.appendChild(document.createElement("div"))
            }
        }
        init()
    }
    async function loop() {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }
    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        setShow(prediction);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction =
                prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = (classPrediction);
        }
    }
    return (
        <div>
            <div className="d-flex justify-content-center">
                <Button variant="outline-info" onClick={Webcam}>Open AI Camera</Button>
                <div id='webcam-container' className="box-webcam"></div>
                <div id='label-container' className="text-webcam"></div>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    )
}
export default Camera;