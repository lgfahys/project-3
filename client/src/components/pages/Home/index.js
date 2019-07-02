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
import User from './User';
import PplNearYou from "./PplNearYou";
import PChatReq from './PChatReq';

class Home extends Component {
    render() {
        return (
        <div className="App">
            <Container>
                <Row className='firstRow'>
                    <Col sm="12" md="12" lg="12">
                        <h2>Chats</h2>
                    </Col>
                        <User />
                        <User />
                        <User />
                    <Col sm="12" md="12" lg="12">
                        <h4>People near you</h4>
                    </Col>
                </Row>
                    <PplNearYou />
                    <PplNearYou />
                    <PplNearYou />    
                <Row className='secondRow'>
                    <Col sm="12" md="12" lg="12">
                        <h4>Pending Chat Requests</h4>
                    </Col>
                </Row>
                    <PChatReq />
                    <PChatReq />
                    <PChatReq />
            </Container>
        </div>


        )
    }
}
export default Home;