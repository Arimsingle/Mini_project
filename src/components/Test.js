import React from 'react';
import { Button } from 'react-bootstrap';
import * as tf from '@tensorflow/tfjs';
import { Map } from 'react-leaflet'
const Test = () => {
    tf.tensor([1, 2, 3, 4]).print();
    return (
        <div>
            <Map />
            <Button variant="outline-info">HI</Button>
        </div>
    )
}
export default Test;