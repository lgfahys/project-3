import React from "react"
import "./style.css";
import "./media.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
import Navbar from "../../Navbar/loggedOut";

function Landing() {
    return (
        <div className="App">
           <Navbar />
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