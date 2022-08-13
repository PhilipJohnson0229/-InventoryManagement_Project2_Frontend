import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";
import { useLocalState } from "./util/UserLocalStorage";

export const Login = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  
  //Validation
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);
  
  // useEffect(() => {
  //   if (user.jwt) navigate("/dashboard");
  // }, [user]);

  
    setErrorMsg("");
    
    const reqBody = {
      username: username,
      password: password,
    };

    const handleSubmit = async (event) => {
      try{
        if(!jwt){
          const e = await axios.post('http://localhost:8080/auth/login', reqBody)
          .then((response) => {
            //hopefully this giyves us access to jwt globally
          setJwt(response.headers['authorization']);
          
          })
          .then((response) => {
            if (response.status === 200) return response.text();
            else if (response.status === 401 || response.status === 403) {
              setErrorMsg("Invalid username or password");
            } else {
              setErrorMsg(
                "Something went wrong, try again later or reach out to trevor@coderscampus.com"
              );
            }
          })
          .then((data) => {
            if (jwt) {
              //Validation
              axios.get(`http://localhost:8080/auth/validate`, jwt).then((isValid) => {
                setIsValid(isValid);
                setIsLoading(false);
              }); 
            
              return isLoading ? (
                <div>Loading...</div>
              ) : isValid === true ? (
                <div>finished</div>
              ) : (
                <div>second finished</div>
              );
            }
          });
      }
      }catch (err) {
        console.error(err);
      } 
    }
    
  return (
    <>
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
    </>
  );

}

