import React, { useState, useEffect } from 'react';
import './scss/App.scss'
import 'leaflet/dist/leaflet.css'
import MapView from './components/MapView';
import ListView from './components/ListView';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { apiAction } from './redux/api/action'
function App() {
  const actionApi = bindActionCreators(apiAction, useDispatch())
  useEffect(() => {
    actionApi.getAPiCovid();
  }, [])
  const api = useSelector(state => state.api)
  const locationArray = api
  return (
    <div>
      <ListView />
      <MapView
        locationArray={locationArray}
      />
    </div>
  );
}

export default App;
