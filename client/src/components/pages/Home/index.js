import React, { Component } from "react";
import "./media.css";
import "./style.css";

import NavLI from "../../Navbar/loggedIn";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import User from "./components/User";
import PplNearYou from "./components/PplNearYou";
import PChatReq from "./components/PChatReq";
import BottomRow from './components/row'

const mongodb = [
    {
        user: "Elvin",
    },
    {
        user: "Lindsey"
    }
];



class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: {
                id: "",
                location: ""
            },
        };
    }
    
    console = (something) => {
        console.log(something);
        // console.log(this.props);
        // console.log(this.state);
    }

    renderActiveChats = () => {
        let someArray = mongodb;

        return (
            someArray.map((element) => {
                return ( // User component, need to replace
                    <Col className="userChatWrapper" sm="1" md="2" lg="2">
                            <img className="userImgHome" alt="user-icon" src="../../assets/images/user.png " />
                            <h4>{element.user}</h4>
                    </Col>
                ); 
            })        
        ); 
    }

    renderNearChats = () => {
        let someArray = mongodb;

        return (
            someArray.map((element) => {
                return (
                    <Row className="userNearWrapper">
                        <Col sm="1" md="1" lg="1">
                            <img className="pplNearYouUser" alt="user-icon" src="../../assets/images/user.png "/>
                        </Col>
                        
                        <Col className="name-style" sm="2" md="2" lg="2">
                            <h4>{element.user}</h4>
                        </Col>
                        
                        <Col className="btn-style" sm="3" md="3" lg="3">
                            <button className="btn btn-outline-default">Request Chat<i className="fas far fa-plus-square pl-1"></i></button>
                        </Col>
                        
                        <Col className="btn-style" sm="3" md="3" lg="3">
                            <button className="btn btn-default">Profile<i className="fas fas fa-user pl-1"></i></button>
                        </Col>
                    </Row>
                );
            })
        );
    }

    renderPendingChats = () => {
        let someArray = mongodb;

        return (
            someArray.map((element) => {
                return (
                    <Row className="userPendingWrapper">
                        <Col sm="1" md="1" lg="1">
                            <img className="pChatReqUser" alt="user-icon" src="../../assets/images/user.png"/>
                        </Col>

                        <Col className="name-style" sm="2" md="2" lg="2">
                            <h4>{element.user}</h4>
                        </Col>

                        <Col className="btn-style" sm="3" md="3" lg="2">
                            <button className="btn btn-outline-default">Accept<i className="fas far fa-plus-square pl-1"></i></button>
                        </Col>

                        <Col className="btn-style" sm="1" md="2" lg="2">
                            <button className="btn btn-danger">Decline<i className="fas far fa-thumbs-down pl-1"></i></button>
                        </Col>

                        <Col className="btn-style" sm="1" md="2" lg="2">
                            <button className="btn btn-default">Profile<i className="fas fas fa-user pl-1"></i></button>
                        </Col>
                    </Row>
                );
            })
        );
    }

    render() {
        return (
        <div className="chat-page">
            <NavLI />
                <Container className="homeContainer">

                    <Row className="userActiveChats">
                        <Col sm="10" md="12" lg="12">
                            <h2>Chats</h2>
                        </Col>
                        
                        { this.renderActiveChats() }
                    </Row>

                    <Row className="userNearChats">
                        <Col sm="10" md="12" lg="12">
                            <h2>People near you</h2>
                        </Col>

                        { this.renderNearChats()}
                    </Row>

                    <Row className="userPendingChats">
                        <Col sm="10" md="12" lg="12">
                            <h2>Pending Chat Requests</h2>
                        </Col>
                        
                        { this.renderPendingChats()}
                    </Row>

                </Container>
        </div>


        )
    }
}
export default Home;