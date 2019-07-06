import React, { Component } from "react";
// import "./assets/styleLanding.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import User from "./components/User";
import PplNearYou from "./components/PplNearYou";
import PChatReq from "./components/PChatReq";
import NavLI from "../../Navbar/loggedIn";


class Home extends Component {
    render() {
      return (
        <div className="App">
           <NavLI />
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