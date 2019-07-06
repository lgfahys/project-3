import React from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import "./style.css";
import "./media.css";
import "./media.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../../Navbar/loggedOut";

const signUpPage = () => {
  return (
    <div className="App">
    <Navbar />
    <Container fluid>
      <Row className="signUpRow"> 
      <Col xs={12} md={2} lg={4}></Col>
        <Col xs={12} md={8} lg={4}>
          <MDBCard>
            <MDBCardBody>
              <form>
                <div className="text-center">
                      <h3 className="dark-grey-text mb-5">
                        <strong>Sign up</strong>
                      </h3>
                    </div>
                <div className="grey-text">
                  <MDBInput
                    label="First Name"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Email"
                    icon="envelope"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Phone"
                    icon="phone"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Gender"
                    icon="user"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    type="password"
                    validate
                  />
                  <MDBInput
                    label="Confirm Password"
                    icon="exclamation-triangle"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                </div>
                <div className="text-center py-4 mt-3">
                  <MDBBtn type="submit">
                    Sign Up
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </Col>
        <Col xs={12} md={2} lg={4}></Col>
      </Row>y
    </Container>
    </div>
  );
};

export default signUpPage;
