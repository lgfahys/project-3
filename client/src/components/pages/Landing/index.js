import React from "react"
import "./style.css";
import "./media.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'

function Landing() {
    return (
        <div className="App">
           <Nav variant="pills" defaultActiveKey="/home">
                <Nav.Item>
                    <Image className="navImage" src="../../../assets/images/rating.png"/>
                </Nav.Item>
                <Nav.Item className="topLoginBtn">
                    <Nav.Link eventKey="link-1">LOGIN</Nav.Link>
                </Nav.Item>
                <Nav.Item className="topSignUpBtn">
                    <Nav.Link eventKey="link-2">SIGN UP</Nav.Link>
                </Nav.Item>
            </Nav>
            <Container>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                        <h1 className="mainH1">CHATTER</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                         <p className="mainP">The app that helps you meet new people who are where you are. Anyone you see on Chatter is within 100 feet of you and you won't see them when you leave. So when you talk to someone, introduce yourself and try to meetup with them! Seize the day!</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                         <div className="center">
                            <a href="/" className="btn-v2 green">Sign Up</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
      );
}

export default Landing;