import React, { Component } from "react";
import "./media.css";
import "./style.css";

import NavLI from "../../Navbar/loggedIn";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Geo, { inRadius } from "../../Geo";

// import User from "./components/User";
// import PplNearYou from "./components/PplNearYou";
// import PChatReq from "./components/PChatReq";
// import BottomRow from './components/row'

import users from "./testusers";

let mongodb = users;


// Chats
// acceptedChats : [],

// People Near You

// console.log(activeusers);


// get active users
// get distance of users


// pending Chats
// pendingChats : []

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            user: {
                id: "",
                location: ""
            },
        };

        this.location = {
            latitude: null,
            longitude: null
        };
        
    }
    
    console = (something) => {
        console.log(something);
        // console.log(this.props);
        // console.log(this.state);
    }

    renderActiveChats = () => {
        let currentUser = mongodb[0];

        let activeUsers = mongodb
            .filter((user) => {
                if (user.isActive) {
                    return user;
                };
            });

        let activeChats = activeUsers
            .filter((user) => {
                if (currentUser.acceptedChats.indexOf(user._id) !== -1) {
                    console.log(`Accepted: ${user.name} = ${currentUser.acceptedChats.indexOf(user._id)}`);
                    return user;
                } else {
                    console.log(`Not Accepted: ${user.name} = ${currentUser.acceptedChats.indexOf(user._id)}`);
                }
            });

        return (
            activeChats.map((element) => {
                return ( // User component, need to replace
                    <Col className="userChatWrapper" sm="1" md="2" lg="2">
                            <img className="userImgHome" alt="user-icon" src="../../assets/images/user.png " />
                            <h4>{element.name}</h4>
                    </Col>
                ); 
            })        
        ); 
    }

    renderNearChats = () => {
        let currentUser = mongodb[0];

        let activeUsers = mongodb
            .filter((user) => {
                if (user.isActive && currentUser.acceptedChats.indexOf(user._id) === -1 && currentUser.pendingChats.indexOf(user._id) === -1) {
                    return user;
                };
            });
        
        let nearChats = activeUsers
            .filter((user) => {
                if (inRadius(currentUser.recentLocation, user.recentLocation)) {
                    console.log(`In range: ${user.name}`);
                    return user;
                } else {
                    console.log(`Out of range: ${user.name}`);
                }
            });

        return (
            nearChats.map((element) => {
                return (
                    <Row className="userNearWrapper">
                        <Col sm="1" md="1" lg="1">
                            <img className="pplNearYouUser" alt="user-icon" src="../../assets/images/user.png "/>
                        </Col>
                        
                        <Col className="name-style" sm="2" md="2" lg="2">
                            <h4>{element.name}</h4>
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
        let currentUser = mongodb[0];
        
        let activeUsers = mongodb
            .filter((user) => {
                if (user.isActive) {    
                    return user;
                };
            });
        
        let pendingChats = activeUsers
        .filter((user) => {
            if (currentUser.pendingChats.indexOf(user._id) !== -1) {
                console.log(`Pending: ${user.name} = ${currentUser.pendingChats.indexOf(user._id)}`);
                return user;
            } else {
                
            }
        });

        return (
            pendingChats.map((element) => {
                return (
                    <Row className="userPendingWrapper">
                        <Col sm="1" md="1" lg="1">
                            <img className="pChatReqUser" alt="user-icon" src="../../assets/images/user.png"/>
                        </Col>

                        <Col className="name-style" sm="2" md="2" lg="2">
                            <h4>{element.name}</h4>
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

    getCurrentLocation = ({latitude, longitude}) => {
        this.location.latitude = latitude;
        this.location.longitude = longitude;
        console.log("Home Page: ", latitude, longitude);
    }

    getRadius = ({latitude, longitude}) => {

    }

    render() {
        // {this.console(mongodb);}
        return (
        <div className="chat-page">
            <Geo getLocation={this.getCurrentLocation}/>
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