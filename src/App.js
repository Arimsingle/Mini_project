import React, { useState, useEffect, useCallback } from 'react';
import './scss/App.scss'
import 'leaflet/dist/leaflet.css'
import MapView from './components/MapView';
import ListView from './components/ListView';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { apiAction } from './redux/api/action'
import DetailsView from './components/DetailsView';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Chart from './components/Chart';
function App() {
  const actionApi = bindActionCreators(apiAction, useDispatch())
  const [selected, setSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState([13, 100]);
  const [keyWord, setKeyWord] = useState('confirmed');
  useEffect(() => {
    actionApi.getAPiCovid();
  }, [])
  const onSelectedKey = useCallback((key) => {
    if (key === 'confirmed') {
      setKeyWord('confirmed');
    }
    else if (key === "deaths") {
      setKeyWord('deaths');
    }
    else {
      alert('Api ส่วนของ recovered มีปัญหา')
    }
  }, [])

  const maxTomin = (api) => {
    return [...api].sort((location1, location2) => {
      if (keyWord === 'confirmed')
        return location2.latest.confirmed - location1.latest.confirmed;
      else if (keyWord === 'deaths')
        return location2.latest.deaths - location1.latest.deaths;
    })
  }
  const api = useSelector(state => state.api)
  const MaxtoMin = maxTomin(api) //มากไปน้อย
  const locationArray = MaxtoMin;

  // const maxTomin_confirmed = (api) => {
  //   return [...api].sort((location1, location2) => {
  //     return location2.latest.confirmed - location1.latest.confirmed;
  //   })
  // }
  // const api = useSelector(state => state.api)
  // const MaxtoMin = maxTomin_confirmed(api) //มากไปน้อย
  // const locationArray = MaxtoMin;


  const onSelected = useCallback((id) => {
    const location = locationArray.find(_location => _location.id === id);
    if (location === undefined) {
      setSelected(null)
      return;
    }
    setSelected(location);
    const { coordinates: { latitude, longitude } } = location;
    setMapCenter([latitude, longitude])
  }, [locationArray])

  const onDeSelected = useCallback(() => {
    setSelected(null);
  }, [])
  let detailsView = null;
  if (selected != null) {
    detailsView = <DetailsView location={selected} onCLickClose={onDeSelected} />
  }
  let ChartView = null;
  if (selected != null) {
    ChartView = <Chart location={selected} onCLickClose={onDeSelected} />
  }
  return (
    <div>
      <ListView
        locationArray={locationArray}
        selected={selected}
        onSelected={onSelected}
        onDeSelected={onDeSelected}
        onSelectedKey={onSelectedKey}
      />
      <MapView
        locationArray={locationArray}
        mapCenter={mapCenter}
        onSelecteMarker={onSelected}
      />
      {detailsView}
      {ChartView}
    </div>
  );
}

export default App;
