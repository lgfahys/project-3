import React, { Component } from "react";
import "./stylehome.css";
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