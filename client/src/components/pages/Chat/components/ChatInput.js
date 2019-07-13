import React from "react";
//import React, { Component, Fragment } from "react";
//import React, { Component } from "react";
import "../style.css";
// import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import NavLI from "../../Navbar/loggedIn";
import { MDBBtn } from 'mdbreact';
// import { MDBCard, MDBCardBody, MDBInput, MDBModalFooter } from 'mdbreact';
//import Navbar from "../../Navbar/loggedOut";


function ChatInput (props){
return(
    <Row className='inputRow'>
        <form className="form-group" >
          <Col className="messageRow" sm="10" md="12" lg="12">
          {/* <Fragment> */}
          
            {/* <div > */}
              {/* <input type="text" id="example1" className="form-control form-control-lg" /> */}
              {/* <div className="card-input"> */}
                <input type="text" placeholder="Message" className="form-control" value={props.message} onChange={(ev) => props.changemessage(ev)}/>
                <MDBBtn {...props} onClick={props.sendmessage}  type="submit"> Send</MDBBtn>
                {/* <hr/> */}
              {/* </div> */}
            {/* </div> */}

          {/* </Fragment> */}
        </Col>
        {/* <Col className="btnRow" sm="2" md="2" lg="2"> */}
            {/* <Fragment> */}
              {/* <MDBBtn {...props} onClick={props.sendMessage}  type="submit"> Send</MDBBtn> */}
            {/* </Fragment> */}
        {/* </Col> */}
      </form>
      </Row>
)


}
export default ChatInput;