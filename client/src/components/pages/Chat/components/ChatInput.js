import React, { Component, Fragment } from "react";
//import React, { Component } from "react";
import "../style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import NavLI from "../../Navbar/loggedIn";
import { MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';
//import Navbar from "../../Navbar/loggedOut";


function ChatInput (props){
return(
    <Row className='inputRow'>
        <form >
        <Col sm="10" md="10" lg="10">
        <Fragment>
        
          <div className="form-group">
            {/* <input type="text" id="example1" className="form-control form-control-lg" /> */}
            <div className="card-footer">
              <input type="text" placeholder="Message" className="form-control" value={props.message} onChange={(ev) => props.changeMessage(ev)}/>
              <br/>
            </div>
          </div>

         </Fragment>
      </Col>
      <Col sm="2" md="2" lg="2">
          <Fragment>
          <MDBBtn {...props} onClick={props.sendMessage}  type="submit">Send</MDBBtn>
          </Fragment>
      </Col>
      </form>
      </Row>
)


}
export default ChatInput;