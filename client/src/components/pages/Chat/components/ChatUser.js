import React, { Component } from "react";
import "../style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBAvatar, MDBBadge, MDBIcon, MDBBtn, MDBScrollbar } from "mdbreact";



function ChatUser (){

    return(
        <Row className="userRow">
        <Col sm="3" md="3" lg="3">
        <button class=" btn-floating btn-primary btn-lg"><i class="fas fas fa-arrow-left"></i></button>    
        </Col>
        <Col sm="6" md="6" lg="6">
    <img className="user" alt="user-icon" src="../../../assets/images/user.png " />
                    <h4>Name</h4>
    
        </Col>
        <Col sm="3" md="3" lg="3">
        <button class="btn btn-danger">Primary<i class="fas  pl-1"></i></button>
        </Col>
        </Row>
        
    )
    
    }
    export default ChatUser;



