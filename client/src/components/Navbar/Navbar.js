import React from "react"
//import "./assets/styleLanding.css";
//import "./assets/mediaLanding.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'

function Navbar(){
    return(
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
    )
}
export default Navbar;