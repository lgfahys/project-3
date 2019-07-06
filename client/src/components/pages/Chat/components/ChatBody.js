import React, { Component } from "react";
import "../style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import NavLI from "../../Navbar/loggedIn";
import { MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';
//import Navbar from "../../Navbar/loggedOut";

function ChatBody (props){
return(
    <Row className="chatBodyRow">
        <Col sm="12" md="12" lg="12">
            {/* <h4>Chat Body</h4> */}
            <div className="messages" style={{backgroundColor: "white"}}>
                {props.messages.map(message => {
                    return (
                        <div>{message.author}: {message.message}<hr/></div>
                        
                    )
                })}
            </div>
        </Col>
    </Row>
)
}
export default ChatBody;