import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import "./style.css";
import "./media2.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import React, { Component } from 'react';
import { MDBCol, MDBRow, MDBCard, MDBCardUp, MDBCardBody, MDBAvatar, MDBRotatingCard, MDBIcon } from "mdbreact";

class CardExample extends Component {
state = {
  flipped: false
}

handleFlipping = () => {
  this.setState({ flipped: !this.state.flipped });
}

render() {
  const colStyle = { maxWidth: "22rem" };

  return (
    <MDBRow>
      <MDBCol style={{ minHeight: '26rem' }}>
        <MDBRotatingCard flipped={this.state.flipped} className="text-center h-100 w-100" style={colStyle}>
          <MDBCard className="face front">
            <MDBCardUp>
              <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/photo7.jpg" alt="" />
            </MDBCardUp>
            <MDBAvatar className="mx-auto white" circle>
              <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg" alt="" className="rounded-circle" />
            </MDBAvatar>
            <MDBCardBody>
              <h4 className="font-weight-bold mb-3">Marie Johnson</h4>
              <p className="font-weight-bold blue-text">Web developer</p>
              <a href="#!" className="rotate-btn" data-card="card-1" onClick={this.handleFlipping}>
                <MDBIcon icon="redo" /> Click here to rotate
              </a>
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="face back">
            <MDBCardBody>
              <h4 className="font-weight-bold">About me</h4>
              <hr />
              <p>
                Hi, my name is Marie and I love to meet new people at social.
                gatherings in the area. I just moved here six months ago,
                but my favorite social spots to visit are located in the heart
               of downtown. Can't wait to meet up and start "chatting" with new
               friends!
              </p>
              <hr />
              <ul className="list-inline py-2">
                <li className="list-inline-item">
                  <a href="#!" className="p-2 fa-lg fb-ic">
                    <MDBIcon icon="facebook" brand />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!" className="p-2 fa-lg tw-ic">
                    <MDBIcon icon="twitter" brand />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!" className="p-2 fa-lg gplus-ic">
                    <MDBIcon icon="google-plus" brand />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#!" className="p-2 fa-lg li-ic">
                    <MDBIcon icon="linkedin" brand />
                  </a>
                </li>
              </ul>
              <a href="#!" className="rotate-btn" data-card="card-1" onClick={this.handleFlipping}>
                <MDBIcon icon="undo" /> Click here to rotate back
              </a>
            </MDBCardBody>
          </MDBCard>
        </MDBRotatingCard>
      </MDBCol>
    </MDBRow>
    )
  }
}

export default CardExample;