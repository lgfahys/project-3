import React, { Component } from "react";
import "./assets/styleLogin.css";
import "./assets/mediaLogin.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import Navbar from '../Navbar/Navbar'


class Login extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Container fluid>

          <Row className="loginRow">
          <Col sm= "1" md="4" lg="4">
              /</Col>
            <Col sm="12" md="4" lg="4">
              <MDBCard>
                <MDBCardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                      <strong>Sign in</strong>
                    </h3>
                  </div>
                  <MDBInput
                    label="Your email"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Your password"
                    group
                    type="password"
                    validate
                    containerClass="mb-0"
                  />
                  <p className="font-small blue-text d-flex justify-content-end pb-3">
                    Forgot
                <a href="#!" className="blue-text ml-1">

                      Password?
                </a>
                  </p>
                  <div className="text-center mb-3">
                    <MDBBtn
                      type="button"
                      gradient="blue"
                      rounded
                      className="btn-block z-depth-1a"
                    >
                      Sign in
                </MDBBtn>
                  </div>
                </MDBCardBody>
                <MDBModalFooter className="mx-5 pt-3 mb-1">
                  <p className="font-small grey-text d-flex justify-content-end">
                    Not a member?
                <a href="#!" className="blue-text ml-1">

                      Sign Up
                </a>
                  </p>
                </MDBModalFooter>
              </MDBCard>
            </Col>
            <Col sm= "1" md="4" lg="4">
              /</Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default Login;