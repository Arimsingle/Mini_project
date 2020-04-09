import React, { useState, useEffect, useCallback } from 'react';
import './scss/App.scss'
import './css/App.css'
import 'leaflet/dist/leaflet.css'
import MapView from './components/MapView';
import ListView from './components/ListView';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { apiAction } from './redux/api/action'
import { apiAction_TH_TD } from './redux/api_TH_TD/action'
import { apiAction_TH_PV } from './redux/api_TH_PV/action'
import { apiAction_TH_GD } from './redux/api_TH_GD/action'
import DetailsView from './components/DetailsView';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavDropdown, Nav, Button, Modal } from 'react-bootstrap';
import Chart from './components/Chart';
import Sub_Chart from './components/Sub_Chart'
import Sub_Chart2 from './components/Sub_Chart2'
import Linear_regression from './components/Linear_regression'
import Axios from 'axios';
import AnchorLink from 'react-anchor-link-smooth-scroll'
const App = () => {
  const actionApi = bindActionCreators(apiAction, useDispatch());
  const apiActionTHTD = bindActionCreators(apiAction_TH_TD, useDispatch());
  const apiReducerTHPV = bindActionCreators(apiAction_TH_PV, useDispatch());
  const apiActionTHGD = bindActionCreators(apiAction_TH_GD, useDispatch());
  const [selected, setSelected] = useState(null);
  const [mapCenter, setMapCenter] = useState([13, 100]);
  const [keyWord, setKeyWord] = useState('confirmed');
  const [selectedListBar, setSelectedListBar] = useState(false);
  const [dataArray, setDataArray] = useState([]);
  const apiTimeline = "https://covid19.th-stat.com/api/open/timeline"
  useEffect(() => {
    Axios.get(apiTimeline).then(res => {
      setDataArray(res.data.Data)
    })
    actionApi.getAPiCovid();
    apiActionTHTD.getAPiCovid_TH_TD();
    apiReducerTHPV.getAPiCovid_TH_PV();
    apiActionTHGD.getAPiCovid_TH_GD();
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
  const Api_TH_Today = useSelector(state => state.Api_TH_Today)
  const Api_TH_PV = useSelector(state => state.Api_TH)
  const Api_THGn = useSelector(state => state.Api_TH_GD)
  const MaxtoMin = maxTomin(api) //มากไปน้อย
  const locationArray = MaxtoMin;
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
    ChartView = <Chart location={selected} onCLickClose={onDeSelected} Api_TH_PV={Api_TH_PV} Api_TH_Today={Api_TH_Today} />
  }
  let showListBar = null;
  if (selectedListBar) {
    showListBar = <ListView
      keyWord={keyWord}
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
  const MAP_WORLD = () => {
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
    )
  }
  useEffect(() => {
  }, [])
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const ModalAlert = (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Api World</Modal.Title>
        </Modal.Header>
        <Modal.Body>Arima Deverloper</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Open
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
  return (
    <div id="header-page">
      {ModalAlert}
      <header>
        <div>
          <ul className="d-flex justify-content-between">
            <div className="text-navbar">
              <Nav className="mr-auto">
                <div><img src="https://www.computing.psu.ac.th/th/wp-content/uploads/2018/03/COC_logo.png" alt="Photo has problem" width="80px" className="rounded-0" /></div>
                <div style={{ display: "flex" }}>
                  <Nav.Link ><AnchorLink href="#header-page">Home</AnchorLink></Nav.Link>
                  <NavDropdown title="ThaiLand Info" id="basic-nav-dropdown">
                    <NavDropdown.Item><AnchorLink href="#thailand" className="nav-text-bar">Histrogram Grahp</AnchorLink></NavDropdown.Item>
                    <NavDropdown.Item><AnchorLink href="#thailand" className="nav-text-bar">Infected person</AnchorLink></NavDropdown.Item>
                    <NavDropdown.Item><AnchorLink href="#thailand" className="nav-text-bar">Infected Gender</AnchorLink></NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="World Info" id="basic-nav-dropdown">
                    <NavDropdown.Item><AnchorLink href="#thailand" className="nav-text-bar">Histrogram Grahp</AnchorLink></NavDropdown.Item>
                    <NavDropdown.Item><AnchorLink href="#thailand" className="nav-text-bar">Infected person</AnchorLink></NavDropdown.Item>
                    <NavDropdown.Item><AnchorLink href="#thailand" className="nav-text-bar">Infected Gender</AnchorLink></NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link ><AnchorLink href="#map-world" className="nav-text-bar">AI Camera</AnchorLink></Nav.Link>
                  <Nav.Link ><AnchorLink href="#map-world" className="nav-text-bar">AI Predict</AnchorLink></Nav.Link>
                </div>
              </Nav>
            </div>
            <div className="text-navbar">
              <Nav className="mr-auto">
                <NavDropdown className="text-head" title={<span className="text-dark"><img src="https://i.pinimg.com/originals/fb/3f/e7/fb3fe7a71631c34341ea4ccb98cf24b3.png" alt="Photo has problem" width="30px" className="rounded-circle" />Arim Cheberahim</span>} id="basic-nav-dropdown">
                  <NavDropdown.Item href="">Option</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="">Logout</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link className="text-dark" href=""><strong>GitHub</strong></Nav.Link>
                <Nav.Link className="text-dark" href="">Register</Nav.Link>
              </Nav>
            </div>
          </ul>
        </div>
      </header>
      <div>
        <div className="box-ct">
          <div className="d-flex justify-content-center">
            <div style={{ margin: "100px" }}>
              <div>
                <h3>Corona Virus With <strong style={{ color: "#00c2ff" }}>React.JS</strong><br />Status Covid 19 Of World</h3>
                <br />
                <p className="text-justify">
                  Coronavirus disease (COVID-19) is an infectious
                  disease caused by a newly discovered coronavirus.
                  Most people infected with the COVID-19 virus
                  will experience mild to moderate respiratory illness and recover
                  without requiring special treatment.
                  Older people, and those with underlying medical problems like
                  cardiovascular disease, diabetes, chronic respiratory disease
                </p>
              </div>
              <div className="dis-p">
                <div className="btn-tmg">
                  <Button className="btn-mg" variant="outline-info" size="lg" onClick={handleShow}>API WORLD</Button>
                  <Button variant="outline-info" size="lg">API THAILAND</Button>
                </div>
              </div>
            </div>
            <div style={{ margin: "100px" }}>
              <Sub_Chart2 Api_TH_Today={Api_TH_Today} />
            </div>
          </div>
        </div>
        <div id="thailand">
          <div className="bd-smr"></div>
          <h3 className="text-smr">ThaiLand Status Today</h3>
          <div className="d-flex justify-content-center">
            <Sub_Chart Api_TH_Today={Api_TH_Today} Api_THGn={Api_THGn} />
          </div>
        </div>
      </div>
      <div id="linear-regression">
        <div>
          <h3 className="text-smr-2">Prediction statistics(linear regression)</h3>
        </div>
        <Linear_regression dataArray={dataArray} />
      </div>
      <div>
        <div>
          <h3 className="text-smr">World Status Today</h3>
          <p className="d-flex justify-content-center">เลือกประเทศไทยเพื่อดูจำนวนคนที่ติดของแต่ล่ะจังหวัด</p>
        </div>
        <div id="map-world">
          {MAP_WORLD()}
        </div>
      </div>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <h6>About</h6>
              <p className="text-justify">Hello World,Heh! Hello <i>Mini Project</i> Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.  Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness.</p>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Categories</h6>
              <ul className="footer-links">
                <li><a href="http://scanfcode.com/category/c-language/">C</a></li>
                <li><a href="http://scanfcode.com/category/front-end-development/">UI Design</a></li>
                <li><a href="http://scanfcode.com/category/back-end-development/">PHP</a></li>
                <li><a href="http://scanfcode.com/category/java-programming-language/">Java</a></li>
                <li><a href="http://scanfcode.com/category/android/">Android</a></li>
                <li><a href="http://scanfcode.com/category/templates/">Templates</a></li>
              </ul>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li><a href="http://scanfcode.com/about/">About Us</a></li>
                <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
                <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
                <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
                <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">Copyright &copy; 2017 All Rights Reserved by
         <a href="https://web.facebook.com/arim.mn.10">Arima</a>.
            </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li><a className="facebook" href="https://web.facebook.com/arim.mn.10/" target='_blank'><i className="fa fa-facebook"></i></a></li>
                <li><a className="twitter" href="https://github.com/Arimsingle" target='_blank'><i className="fa fa-github"></i></a></li>
                <li><a className="dribbble" href="https://steamcommunity.com/profiles/76561198382602287/" target='_blank'><i className="fa fa-steam"></i></a></li>
                <li><a className="linkedin" href="https://medium.com/@arimcheberahim"><i className="fa fa-medium"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
