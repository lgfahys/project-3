import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./media.css";
import "./style.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Geo, { inRadius } from "../../Geo";
import API from "../../../utils/API";

class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            users: null,
            redirect: false,
            path: null
        };

        this.location = {
            latitude: null,
            longitude: null
        };
        
    }

    getUsers = () => {
        console.log("Get All Users");
        API.getUsers()
        .then(res => {
            console.log("Got to Res", res);
            this.setState({ users: res.data});
        })
        .catch(err => console.log(err));
    }

    componentDidMount = () => {
        this.getUsers();
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        });
    }

    renderActiveChats = () => {
        if (this.state.users === undefined || this.state.users === null) return;

        let currentUser = this.state.users[0];
        console.log(`Current User: ${currentUser.name}`)

        let activeUsers = this.state.users
            .filter((user) => {
                if (user.isActive) {
                    return user;
                };
            });

        let activeChats = activeUsers
            .filter((user) => {
                if (currentUser.acceptedChats.indexOf(user._id) !== -1) {
                    // console.log(`Accepted: ${user.name} = ${currentUser.acceptedChats.indexOf(user._id)}`);
                    return user;
                } else {
                    // console.log(`Not Accepted: ${user.name} = ${currentUser.acceptedChats.indexOf(user._id)}`);
                }
            });
        
        if (activeChats.length === 0) {
            return (
                <Col sm="10" md="12" lg="12" style={{color: "#BBB"}}>
                    You currently have no active chats
                </Col>
            );
        } else {
        return (
            activeChats.map((element) => {
                return ( // User component, need to replace
                    <Col className="userChatWrapper" sm="1" md="2" lg="2" key={element._id}>
                            <img 
                                onClick={() => this.handleActiveChat(element._id)}
                                className="userImgHome" alt="user-icon" src="../../assets/images/user.png " 
                            />
                            <h4
                                onClick={() => this.handleActiveChat(element._id)}
                            >
                                {element.name}
                            </h4>
                    </Col>
                ); 
            })        
        ); 
        }
    }

    renderNearChats = () => {
        if (this.state.users === undefined || this.state.users === null) return;
        
        let currentUser = this.state.users[0];

        let activeUsers = this.state.users
            .filter((user) => {
                if (user.isActive 
                    && 
                    currentUser.acceptedChats.indexOf(user._id) === -1
                    &&
                    currentUser.pendingChats.indexOf(user._id) === -1
                    &&
                    currentUser.requestedChats.indexOf(user._id) === -1
                    ) {
                    return user;
                };
            });
        
        let locatedUsers = activeUsers
            .filter((user) => {
                if (user.recentLocation) {
                    return user;
                }
            });

        let nearChats = locatedUsers
            .filter((user) => {
                if (inRadius(currentUser.recentLocation, user.recentLocation)) {
                    console.log(`In range: ${user.name}`);
                    return user;
                } else {
                    console.log(`Out of range: ${user.name}`);
                };
            });
        
        if (nearChats.length === 0) {
            return (
                <Col sm="10" md="12" lg="12" style={{color: "#BBB", marginTop: "8px"}}>
                    No one is near you
                </Col>
            );
        } else {
        return (
            nearChats.map((element) => {
                return (
                    <Row className="userNearWrapper" key={element._id}>
                        <Col sm="1" md="1" lg="1">
                            <img className="pplNearYouUser" alt="user-icon" src="../../assets/images/user.png "/>
                        </Col>
                        
                        <Col className="name-style" sm="2" md="2" lg="2">
                            <h4>{element.name}</h4>
                        </Col>
                        
                        <Col className="btn-style" sm="3" md="3" lg="3">
                            <button 
                                onClick={() => this.handleRequestChat(element._id)}
                                className="btn btn-outline-default"
                            >
                                Request Chat<i className="fas far fa-plus-square pl-1"></i>
                            </button>
                        </Col>
                        
                        <Col className="btn-style" sm="3" md="3" lg="3">
                            <button
                                onClick={() => this.handleProfile(element._id)}
                                className="btn btn-default"
                            >
                                Profile<i className="fas fas fa-user pl-1"></i>
                            </button>
                        </Col>
                    </Row>
                );
            })
        );
        }
    }

    renderPendingChats = () => {
        if (this.state.users === undefined || this.state.users === null) return;

        let currentUser = this.state.users[0];
        
        let activeUsers = this.state.users
            .filter((user) => {
                if (user.isActive) {    
                    return user;
                };
            });
        
        let pendingChats = activeUsers
            .filter((user) => {
                if (currentUser.pendingChats.indexOf(user._id) !== -1) {
                    // console.log(`Pending: ${user.name} = ${currentUser.pendingChats.indexOf(user._id)}`);
                    return user;
                } else {
                    
                };
            });

        let requestedChats = activeUsers
            .filter((user) => {
                if (currentUser.requestedChats.indexOf(user._id) !== -1) {
                    // console.log(`Requested: ${user.name} = ${currentUser.requestedChats.indexOf(user._id)}`);
                    return user;
                } else {
                    
                };
            });

        if (pendingChats.length === 0 && requestedChats.length === 0) {
            return (
                <Col sm="10" md="12" lg="12" style={{color: "#BBB", marginTop: "7px"}}>
                    There are no pending requests
                </Col>
            );
        } else {
        return (
            <div className="pendingContainer">
            {
            pendingChats.map((element) => {
                return (
                    <Row className="userPendingWrapper" key={element._id}>
                        <Col sm="1" md="1" lg="1">
                            <img className="pChatReqUser" alt="user-icon" src="../../assets/images/user.png"/>
                        </Col>

                        <Col className="name-style" sm="2" md="2" lg="2">
                            <h4>{element.name}</h4>
                        </Col>

                        <Col className="btn-style" sm="3" md="3" lg="2">
                            <button 
                                onClick={() => this.handleApprove(element._id)}
                                className="btn btn-outline-default"
                            >
                                Accept<i className="fas far fa-plus-square pl-1"></i>
                            </button>
                        </Col>

                        <Col className="btn-style" sm="1" md="2" lg="2">
                            <button 
                                onClick={() => this.handleCancel(element._id)}
                                className="btn btn-danger"
                            >
                                Decline<i className="fas far fa-thumbs-down pl-1"></i>
                            </button>
                        </Col>

                        <Col className="btn-style" sm="1" md="2" lg="2">
                            <button 
                                onClick={() => this.handleProfile(element._id)}
                                className="btn btn-default"
                            >
                                Profile<i className="fas fas fa-user pl-1"></i>
                            </button>
                        </Col>
                    </Row>
                );                
            })
            }
            {
            requestedChats.map((element) => {
                return (
                    <Row className="userPendingWrapper" key={element._id}>
                        <Col sm="1" md="1" lg="1">
                            <img className="pChatReqUser" alt="user-icon" src="../../assets/images/user.png"/>
                        </Col>

                        <Col className="name-style" sm="2" md="2" lg="2">
                            <h4>{element.name}</h4>
                        </Col>

                        <Col className="btn-style" sm="3" md="3" lg="2">
                            <button className="btn btn-outline-light" disabled>Pending</button>
                        </Col>

                        <Col className="btn-style" sm="1" md="2" lg="2">
                            <button
                                onClick={() => this.handleCancel(element._id)}
                                className="btn btn-danger"
                            >
                                Cancel<i className="fas far fa-thumbs-down pl-1"></i>
                            </button>
                        </Col>

                        <Col className="btn-style" sm="1" md="2" lg="2">
                            <button 
                                onClick={() => this.handleProfile(element._id)}
                                className="btn btn-default"
                            >
                                Profile<i className="fas fas fa-user pl-1"></i>
                            </button>
                        </Col>
                    </Row>
                )
            })
            }
            </div>
        );
        }
    }

    // May not be needed
    getCurrentLocation = ({latitude, longitude}) => {
        this.location.latitude = latitude;
        this.location.longitude = longitude;
        console.log("Home Page: ", latitude, longitude);

        if (this.state.users) {  
            let currentUser = this.state.users[0];
            console.log("making request to set location");
            API.updateLocationUser(currentUser._id, latitude, longitude)
            .then(res => {
            console.log("Got to Res", res);
            })
            .catch(err => console.log(err));;
        }
    }

    handleActiveChat = (id) => {
        console.log("handling active chat: ", id);
    }

    handleRequestChat = (id) => {
        let currentUser = this.state.users[0];
        console.log("request id1: ", currentUser._id);
        console.log("request id2: ", id);
        API.updateRequestUser(currentUser._id, id)
            .then(res => {
                console.log("Got to Res", res);
                this.getUsers();
            })
            .catch(err => console.log(err));
        
        console.log("handling request chat: ", id);
    }

    handleProfile = (id) => {
        console.log("handling profile page: ", id);

        this.setState({
            redirect: true,
            path: "/profile?" + id
        });

        this.renderRedirect();
    }

    handleCancel = (id) => {
        let currentUser = this.state.users[0];
        
        API.updateCancelUser(currentUser._id, id)
            .then(res => {
                console.log("Got to Res", res);
                this.getUsers();
            })
            .catch(err => console.log(err));

        console.log("handling cancel chat: ", id);
    }

    handleApprove = (id) => {
        let currentUser = this.state.users[0];

        API.updateActiveUser(currentUser._id, id)
            .then(res => {
                console.log("Got to Res", res);
                this.getUsers();
            })
            .catch(err => console.log(err));

        console.log("handling approve chat: ", currentUser._id, id);
    }

    renderRedirect = () => {
        console.log("this is path: " + this.state.path);
        if (this.state.redirect && this.state.path) {
            console.log("Redirecting to: " + this.state.path);
            return <Redirect to={this.state.path} />;
        }
    }

    render() {
        return (
        <div className="chat-page">
            {this.renderRedirect()}
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
            <Geo getLocation={this.getCurrentLocation}/>
        </div>

        )
    }
}
export default Home;