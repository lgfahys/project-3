import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon, MDBBtn, MDBScrollbar } from "mdbreact";
//import "./ChatPage.css";

import ChatUser from "./components/ChatUser"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class ChatPage extends Component {
    render() {
      return (
          <Container>
            <ChatUser />


          </Container>
      )
    }
}
export default ChatPage;