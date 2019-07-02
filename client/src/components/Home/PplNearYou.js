import React, { Component } from "react";

import "./stylehome.css";
//import "./media2.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';

function PplNearYou (){
    return(
        <Row className='userRow'>
            <Col sm="1" md="1" lg="1"><img className="user" src="../../../assets/images/user.png "/> </Col>
            <Col className='col' sm="2" md="2" lg="2">Name</Col>
            <Col sm="3" md="3" lg="3"><button class="btn btn-outline-default">Primary<i class="fas far fa-plus-square pl-1"></i></button></Col>
            <Col sm="3" md="3" lg="3"><button class="btn btn-default">Primary<i class="fas fas fa-user pl-1"></i></button></Col>
        </Row>   
    )
}

export default PplNearYou;
