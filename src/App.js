import './App.css';
import jwt_decode from "jwt-decode";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { NavBar } from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Home } from './components/StoreInventory/Home';
import { Items } from './components/StoreInventory/Items';
import { Stores } from './components/StoreInventory/Stores';
import { Button, Offcanvas, Container, Row, Col, Form, Alert } from 'react-bootstrap';
//Hooks
import {useState, useEffect} from 'react';
import React from 'react';
import axios from 'axios';
import { useLocalState } from './util/UserLocalStorage';



function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  axios.defaults.withCredentials = true;
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [loginMessage, setLoginMessage] = useState("");
  //const [errorMsg, setErrorMsg] = useState(null);
  
  //Validation
  
  const errorMsg = "";
  
/*********************LOGIN***********************/
//do not mess with this it works

//we can leverage local storage to save the jwt for persistence through the app

const reqBody = {
  username: username,
  password: password,
};
  
const handleSubmit = async (event) => {
 
try{
  if(!jwt){
    const e = await axios.post('http://localhost:8080/auth/login', reqBody)
    .then((response) => {
      setJwt(response.headers['authorization']);
      setShow(false);
      if (response.status === 200) {
        return response.text;
      }
      else if (response.status === 401 || response.status === 403) {
        errorMsg = "Invalid username or password";
      } else {
        errorMsg =  "Something went wrong, try again later or reach out to trevor@coderscampus.com";
      }
    });
  }
  }
  catch (err) {
    console.error(err);
  } 
}

useEffect(()=>{
  if(jwt === ""){
    setLoginMessage("Please Log In");
    setShowLoginMessage(true);
  }
  else
  {
  /*ajax(`http://localhost:8080/auth/validate?token=${jwt}`,"get", jwt).then((isValid) => {
    
    setIsValid(isValid);
    setIsLoading(false);
  });
  axios.get(`http://localhost:8080/auth/validate?token=${jwt}`, JSON.stringify(jwt)).then((isValid) => {
                setIsValid(isValid);
                setIsLoading(false);
  }); 
  */
  setLoginMessage("Authenticated");   
  setTimeout(setShowLoginMessage(false), 2000);
  }
 
},[jwt]);

const handleLogout = async (event) => {
  if(jwt){
    const e = await axios.get('http://localhost:8080/auth/logout', reqBody)
    .then((response) => {
      setJwt("");
      if (response.status === 200) {
        return response.text;
      }
      else {
        errorMsg =  "Something went wrong";
      }
    });
  }
}
// hooks allow us to reach into the rendering engine and tell react when code should and should not run
//takes in function and a dependency array
//the empty array means this will run once on load

/*********************LOGIN***********************/

return (
  <>
  <BrowserRouter>
  <NavBar> 
  <section className='nav-section'>
    <div className='nav-item'>
      <Link className='nav-item' to="/">Home</Link>
    </div>
    <div className='nav-item'>
      <Link className='nav-item' to="/cards">Store Locator</Link>
    </div>
    <div className='nav-item'>
      <Link className='nav-item' to="/table">Items</Link>
    </div>   
  </section>
  <section style={{paddingRight: 40}}>
    {showLoginMessage && <Button variant="info" onClick={handleShow}>
      Login
    </Button>}
    {!showLoginMessage && <Button variant="secondary" onClick={handleLogout}>
      Logout
    </Button>}
    </section>
  </NavBar>
  <div>{showLoginMessage && <Alert variant="info" style={{textAlign:'center'}}>
          {loginMessage}
    </Alert>}
    
    </div>
  <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/table" element={<Items/>}/>
      <Route path="/cards" element={<Stores/>}/>
  </Routes>
  </BrowserRouter>
  

  <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Sign In</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
    
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="username">
              <Form.Label className="fs-4">Username</Form.Label>
              <Form.Control
                type="email"
                size="lg"
                placeholder="joe@gmail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md="8" lg="6">
            <Form.Group className="mb-3" controlId="password">
              <Form.Label className="fs-4">Password</Form.Label>
              <Form.Control
                type="password"
                size="lg"
                placeholder="Type in your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        {errorMsg ? (
          <Row className="justify-content-center mb-4">
            <Col md="8" lg="6">
              <div className="" style={{ color: "red", fontWeight: "bold" }}>
                {errorMsg}
              </div>
            </Col>
          </Row>
        ) : (
          <></>
        )}
        <Row className="justify-content-center">
          <Col
            md="8"
            lg="6"
            className="mt-2 d-flex flex-column gap-5 flex-md-row justify-content-md-between"
          >
            <Button
              id="submit"
              type="button"
              size="lg"
              onClick={() => handleSubmit()}
            >
              Login
            </Button>
            
          </Col>
        </Row>
      </Container>
      
      
      </Offcanvas.Body>
    </Offcanvas>
  </>
      
);
}

export default App;
