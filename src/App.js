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
import { NavDropdown, Nav, Button, Modal, Form, Rol, Col, Navbar, Figure } from 'react-bootstrap';
import Chart from './components/Chart';
import Sub_Chart from './components/Sub_Chart'
import Sub_Chart2 from './components/Sub_Chart2'
import Linear_regression from './components/Linear_regression'
import Axios from 'axios';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import * as firebase from 'firebase';
import DisplayLogin from './components/DisplayLogin'
import Background_One from './svg/undraw_the_world_is_mine_nb0e.svg'
import { firestore } from './index'
import Camera from './components/Camera'
import ImgNormal from './photo/IM-0001-0001.jpeg'
import ImgIn from './photo/person100_bacteria_475.jpeg'
import Test from './components/Test'
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
  const [logined, setLogined] = useState(false);
  const [Islogin, setIslogin] = useState('');
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState({
    Male: '',
    Female: ''
  });
  const [age, setAge] = useState('');
  const [province, setProvince] = useState('');

  const apiTimeline = "https://covid19.th-stat.com/api/open/timeline"
  useEffect(() => {
    Axios.get(apiTimeline).then(res => {
      setDataArray(res.data.Data)
    })
    actionApi.getAPiCovid();
    apiActionTHTD.getAPiCovid_TH_TD();
    apiReducerTHPV.getAPiCovid_TH_PV();
    apiActionTHGD.getAPiCovid_TH_GD();
    Session();
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
  const session = useSelector(state => state.session)
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
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="align-justify" class="svg-inline--fa fa-align-justify fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M432 416H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-128H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-128H16a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-128H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
        </div></div>โ
      </div>
    )
  }
  const ToHome = (
    <div className="bg-listbar2">
      <div className="details-view-close-listbar2" href="#home"><div className="s-v-g">
        <AnchorLink href="#home" className="text-dark"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-up" class="svg-inline--fa fa-angle-up fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z"></path></svg></AnchorLink>
      </div>
      </div>
    </div>
  )
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
  const [showWorld, setShowWorld] = useState(false);
  const handleClose = () => setShowWorld(false);
  const handleShow = () => setShowWorld(true);

  const [showWorld2, setShowWorld2] = useState(false);
  const handleClose2 = () => setShowWorld2(false);
  const handleShow2 = () => setShowWorld2(true);

  const [showWorld3, setShowWorld3] = useState(false);
  const handleClose3 = () => setShowWorld3(false);
  const handleShow3 = () => setShowWorld3(true);

  const [showWorld4, setShowWorld4] = useState(false);
  const handleClose4 = () => setShowWorld4(false);
  const handleShow4 = () => setShowWorld4(true);
  const [getData, setGetData] = useState({});
  const Session = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setLoading(true);
        setIslogin(user.email);
        setLogined(true);
      } else {
        setLoading(true);
        setLogined(false);
      }
    });
  }
  const Logout = () => {
    firebase.auth().signOut().then(() => {
      setLoading(true);
      setLogined(false);
    }).catch(error => [
      console.log(error)
    ])
  }
  const ModalAlertWorld = (
    <div>
      <Modal show={showWorld} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Api World</Modal.Title>
        </Modal.Header>
        <Modal.Body>https://coronavirus-tracker-api.herokuapp.com/v2/locations</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
  const ModalAlertThailand = (
    <div>
      <Modal show={showWorld2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Api World</Modal.Title>
        </Modal.Header>
        <Modal.Body>https://covid19.th-stat.com/api/open/cases/sum</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
  const updateUser = (Islogin) => {
    if (Islogin.length >= 6 && password >= 6 && name !== '' && lastname !== '' && age !== '' && province !== '') {
      firestore.collection('Users').doc(Islogin).set({ name, lastname, email, password, gender, age, province }).then(() => {
        alert("เปลียนแปลงข้แมูลเรียบร้อย")
      }).catch(() => {
        alert("มีปัญหาในการเปลียนแปลงของข้อมูล")
      })
    } else {
      alert("มีปัญหาในการเปลียนแปลงของข้อมูล")
    }
  }
  const EditData = (
    <div>
      <Modal show={showWorld3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <Form style={{ width: "300px" }}>
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
                <Form.Check type="checkbox" value="Male" label="Male" onClick={(e) => setGender({ ...gender, Male: e.target.value })} />
                <Form.Check style={{ margin: "0 0 0 10px" }} type="checkbox" value="Female" label="Female" onClick={(e) => setGender({ ...gender, Female: e.target.value })} />
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-info" onClick={() => updateUser(Islogin)}>
            Change
          </Button>
          <Button variant="outline-danger" onClick={handleClose3}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
  const [FBArray, setDataFB] = useState({});

  const ProfileData = (
    <div>
      <Modal show={showWorld4} onHide={handleClose4}>
        <Modal.Header closeButton>
          <Modal.Title>Your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <Form style={{ width: "300px" }}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control value={FBArray.name} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Last-Name</Form.Label>
                <Form.Control value={FBArray.lastname} />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control value={FBArray.email} />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={FBArray.password} />
            </Form.Group>
            <Form.Group id="formGridCheckbox">
              <Form.Label>Gender</Form.Label>
              <Form.Control value={FBArray.male === '' ? "Female" : "Male"} />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Age</Form.Label>
                <Form.Control value={FBArray.age} />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Province</Form.Label>
                <Form.Control value={FBArray.province} />
              </Form.Group>
            </Form.Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={handleClose4}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
  const UserDataFB = (user) => {
    handleShow4();
    firestore.collection('Users').onSnapshot((snapshot) => {
      console.log("############")
      let tasksfirebase = snapshot.docs.map(data => {
        console.log(user, data.id)
        if (data.id === user) {
          console.log(data.data())
          setDataFB(data.data())
        }
        else {
          return;
        }
      })
    })
  }
  const ModalShow = (
    <div>
      {EditData}
      {ModalAlertWorld}
      {ModalAlertThailand}
    </div>
  )
  const Display = (
    <div id="home">
      {ModalShow}
      {ProfileData}
      <div>
        <div>{ToHome}</div>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home"><img src="https://dorm.psu.ac.th/system/files/images/psu-logo.png" alt="Photo has problem" width="50px" /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link><AnchorLink href="#home" className="text-dark">HOME</AnchorLink></Nav.Link>
              <NavDropdown title="THAILAND" id="basic-nav-dropdown">
                <NavDropdown.Item><AnchorLink href="#thailand" className="text-dark">Histrogram Grahp</AnchorLink></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item><AnchorLink href="#Infected-person" className="text-dark">Infected person</AnchorLink></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item><AnchorLink href="#Infected-Gender" className="text-dark">Infected Gender</AnchorLink></NavDropdown.Item>
              </NavDropdown>
              <Nav.Link><AnchorLink href="#map-world" className="text-dark">WORLD</AnchorLink></Nav.Link>
              <Nav.Link ><AnchorLink href="#Ai-camera" className="text-dark">AI CAMERA</AnchorLink></Nav.Link>
              <Nav.Link ><AnchorLink href="#linear-regression" className="text-dark">AI PREDICT</AnchorLink></Nav.Link>
            </Nav>
            <Form inline>
              <NavDropdown className="mr-sm-2" title={<span className="text-dark"><img src="https://i.pinimg.com/originals/fb/3f/e7/fb3fe7a71631c34341ea4ccb98cf24b3.png" alt="Photo has problem" width="30px" className="rounded-circle" />{Islogin.toUpperCase()}</span>} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => UserDataFB(Islogin)}>Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleShow3}>Edit Profile</NavDropdown.Item>
              </NavDropdown>
            </Form>
            <Form inline>
              <Button variant="outline-danger" size="sm" onClick={Logout}>LOGOUT</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

      </div>
      {/* </header> */}
      <div>
        <div className="box-ct">
          <div className="div-box2">
            <div className="position-photo">
              <div className="photo-nav">
                <div style={{ display: "flex" }}>
                  <div>
                    <img className="Background_One" src={Background_One} />
                  </div>
                  <h3><strong style={{ color: "#00c2ff" }}>React.JS</strong><br />Corona Virus Status World and ThaiLand</h3>
                </div>
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
                  <Button className="btn-mg2" variant="outline-info" size="lg" onClick={handleShow2}>API THAILAND</Button>
                </div>
              </div>
            </div>
            <div className="circle-grahp">
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
        <div>
          <Linear_regression dataArray={dataArray} />
        </div>
        <div>
          <div>
            <h3 className="text-smr-2" id="Ai-camera">AI Camera</h3>
          </div>
          <div className="d-flex justify-content-center">
            <h5 style={{ color: "#818a91" }}>กล้องอัจฉริยะที่สามารถตรวจคนติดเชื้อโควิค19 ด้วยภาพ X-RAY</h5>
          </div>
          <div className="d-flex justify-content-center">
            <h6 style={{ color: "#818a91" }}>ตัวอย่างรูปภาพ</h6>
          </div>
          <div className="d-flex justify-content-center">
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src={ImgNormal}
              />
              <Figure.Caption>
                Nomal Person
                </Figure.Caption>
            </Figure>
            &#160;&#160;&#160;&#160;&#160;&#160;
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="171x180"
                src={ImgIn}
              />
              <Figure.Caption>
                Infected Person
                </Figure.Caption>
            </Figure>
          </div>
          <div>
            <Camera />
          </div>
        </div>
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
              <p className="text-justify"><i>Mini Project</i> Most people infected with the COVID-19 virus will experience mild to moderate respiratory illness and recover without requiring special treatment.  Older people, and those with underlying medical problems like cardiovascular disease, diabetes, chronic respiratory disease, and cancer are more likely to develop serious illness.</p>
            </div>
            <div className="col-xs-6 col-md-3">
              <h6>Programing</h6>
              <ul className="footer-links">
                <li><a href="http://scanfcode.com/category/c-language/" target='_blank'>React</a></li>
                <li><a style={{ margin: "10px 10px 10px 10px" }} href="http://scanfcode.com/category/c-language/" target='_blank'>Tensorflow</a></li>
              </ul>
            </div>

            <div className="col-xs-6 col-md-3">
              <h6>PSU Links</h6>
              <ul className="footer-links">
                <li><a href="https://www.phuket.psu.ac.th/" target='_blank'>About PSU</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">&copy; 2020 All Rights Reserved by
              <a href="https://web.facebook.com/arim.mn.10" target='_blank'>Arima</a>.
            </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li><a className="facebook" href="https://web.facebook.com/arim.mn.10/" target='_blank'><i className="fa fa-facebook"></i></a></li>
                <li><a className="twitter" href="https://github.com/Arimsingle" target='_blank'><i className="fa fa-github"></i></a></li>
                <li><a className="dribbble" href="https://steamcommunity.com/profiles/76561198382602287/" target='_blank'><i className="fa fa-steam"></i></a></li>
                <li><a className="linkedin" href="https://medium.com/@arimcheberahim" target='_blank'><i className="fa fa-medium"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
  if (loading === true && logined === false) {
    return <DisplayLogin setLogined={setLogined} logined={logined} />
  }
  if (logined === false) {
    return (
      <div className="d-flex justify-content-center m-5">
        <div className="spinner-grow text-info" style={{ width: "10rem", height: "10rem" }} role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
  if (logined === true) {
    return Display;
  }



}

export default App;
