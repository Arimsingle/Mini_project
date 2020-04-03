import React, { useState, useEffect } from 'react';
import './scss/App.scss'
import 'leaflet/dist/leaflet.css'
import MapView from './components/MapView';
import axios from 'axios'
import ListView from './components/ListView';

const api = "https://coronavirus-tracker-api.herokuapp.com/v2/locations"

function App() {
  const [locationArray, setLocationArray] = useState([])
  useEffect(() => {
    axios.get(api).then((res) => {
      setLocationArray(res.data.locations)
    }).catch((error) => {
      console.log(error)
    })
  }, [])
  return (
    <div>
      <ListView/>
      <MapView
        locationArray={locationArray}
      />
    </div>
  );
}

export default App;
