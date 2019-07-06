import React, { Component, Fragment } from "react";
//import React, { Component } from "react";
import "../style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import NavLI from "../../Navbar/loggedIn";
import { MDBBtn } from 'mdbreact';
// import { MDBCard, MDBCardBody, MDBInput, MDBModalFooter } from 'mdbreact';
//import Navbar from "../../Navbar/loggedOut";


function ChatInput (){
return(
    <Row className='inputRow'>
        <Col sm="10" md="10" lg="10">
    <Fragment>
      <div className="form-group">
       
        <input type="text" id="example1" className="form-control form-control-lg" />
      </div>
      </Fragment>
      </Col>
      <Col sm="2" md="2" lg="2">
          <Fragment>
          <MDBBtn>Default</MDBBtn>
          </Fragment>
      </Col>
      </Row>
)


}
export default ChatInput;