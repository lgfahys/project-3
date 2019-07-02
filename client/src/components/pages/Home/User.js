import React, { Component } from "react";

import "./stylehome.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';


function User(){
        return (
            
            <Col sm="2" md="2" lg="2" className='userImgCol'>
                <img className="user" src="../../../assets/images/user.png " />
                <h4>Name</h4>
            </Col>
            
        )
}
    
export default User;