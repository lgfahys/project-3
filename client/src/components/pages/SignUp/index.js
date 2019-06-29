import React, { Component } from "react";

import "./style.css";
import "./media2.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';


class SignUp extends Component {
  render() {
    return (
      <div className="App">
        <Nav variant="pills" defaultActiveKey="/home">
          <Nav.Item>
            <Image className="navImage" src="../../../assets/images/mail.png" />
          </Nav.Item>
          <Nav.Item className="topLoginBtn">
            <Nav.Link eventKey="link-1">LOGIN</Nav.Link>
          </Nav.Item>
          <Nav.Item className="topSignUpBtn">
            <Nav.Link eventKey="link-2">SIGN UP</Nav.Link>
          </Nav.Item>
          </Nav>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
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
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
        )
      }
  }
export default SignUp;