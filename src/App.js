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
import Axios from 'axios'
import Chart from './components/Chart';
function App() {
  const actionApi = bindActionCreators(apiAction, useDispatch())
  const [selected, setSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState([13, 100]);
  const [keyWord, setKeyWord] = useState('confirmed');
  const [selectedListBar, setSelectedListBar] = useState(false);
  const [Api_TH, setApiTH] = useState([]);
  const [Api_TH_Today, setApiTHToday] = useState([]);
  const api_th = "https://covid19.th-stat.com/api/open/cases/sum";
  const api_th_today = "https://covid19.th-stat.com/api/open/today"
  useEffect(() => {
    actionApi.getAPiCovid();
    Axios.get(api_th).then(res => {
      setApiTH(res.data.Province)
    })
    Axios.get(api_th_today).then(res => {
      setApiTHToday(res.data)
    })
  }, [])
  console.log(Api_TH_Today)
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
  //******************************************************* */
  // const maxTomin_confirmed = (api) => {
  //   return [...api].sort((location1, location2) => {
  //     return location2.latest.confirmed - location1.latest.confirmed;
  //   })
  // }
  // const api = useSelector(state => state.api)
  // const MaxtoMin = maxTomin_confirmed(api) //มากไปน้อย
  // const locationArray = MaxtoMin;
  //******************************************************* */

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
    ChartView = <Chart location={selected} onCLickClose={onDeSelected} Api_TH={Api_TH} Api_TH_Today={Api_TH_Today} />
  }
  let showListBar = null;
  if (selectedListBar) {
    showListBar = <ListView
      locationArray={locationArray}
      selected={selected}
      onSelected={onSelected}
      onDeSelected={onDeSelected}
      onSelectedKey={onSelectedKey}
      closeListBar={setSelectedListBar}
    />
  }
  else {
    showListBar = (
      <div className="bg-listbar">
        <div className="details-view-close-listbar" onClick={() => setSelectedListBar(state => !state)}><div className="s-v-g">
          <svg className="s-v" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="align-left" className="svg-inline--fa fa-align-left fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M12.83 352h262.34A12.82 12.82 0 0 0 288 339.17v-38.34A12.82 12.82 0 0 0 275.17 288H12.83A12.82 12.82 0 0 0 0 300.83v38.34A12.82 12.82 0 0 0 12.83 352zm0-256h262.34A12.82 12.82 0 0 0 288 83.17V44.83A12.82 12.82 0 0 0 275.17 32H12.83A12.82 12.82 0 0 0 0 44.83v38.34A12.82 12.82 0 0 0 12.83 96zM432 160H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0 256H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg>
        </div></div>
      </div>
    )
  }
  return (
    <div>
      {showListBar}
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
