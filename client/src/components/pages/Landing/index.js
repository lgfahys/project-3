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
                    <Image className="navImage" src="../../../assets/images/mail.png"/>
                </Nav.Item>
                <Nav.Item className="firstNavItem">
                    <Nav.Link eventKey="link-1">LOGIN</Nav.Link>
                </Nav.Item>
                <Nav.Item className="secondNavItem">
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
                         <p className="mainP">Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} md={12} lg={12}>
                         <div className="center">
                            <a href="/" className="btn-v2 green">TESTE</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
      );
}

export default Landing;