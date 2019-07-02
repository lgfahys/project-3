import React, { Component } from "react";
import "./stylehome.css";
//import "./media2.css"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
function PChatReq (){
    return(
        <Row className='userSecondRow'>
            <Col sm="1" md="1" lg="1"><img className="user" src="../../../assets/images/user.png "/> </Col>
            <Col className='col' sm="2" md="2" lg="2">Name</Col>
            <Col sm="2" md="2" lg="2"><button class="btn btn-outline-default">Primary<i class="fas far fa-plus-square pl-1"></i></button></Col>
            <Col  sm="2" md="2" lg="2"><button class="btn btn-danger">Primary<i class="fas far fa-thumbs-down pl-1"></i></button></Col>
            <Col sm="2" md="2" lg="2"><button class="btn btn-default">Primary<i class="fas fas fa-user pl-1"></i></button></Col>
        </Row>
    )
}
export default PChatReq;