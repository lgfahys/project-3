import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Container, Row, Col }  from "react-bootstrap";
import "./media.css";
import "./style.css";

// Utils and Helpers
import API from "../../../utils/API";
import { getLocation, inRadius } from "../../Geo";
import { socket } from "../../Navbar";



class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            currentUser: null,
            users: null,
            redirect: false,
            path: null,
            currentLocation: null
        };
        
        socket.on("announceUpdate", (data) => {
            console.log("Got DATA to announce: ", data);
            this.getUsers();
        });
    }

    componentDidMount = () => {
        console.log(`%c➤ Rendering (%s)`, "color: crimson; font-weight: bold;", "Home", "\n", this.props, "\n", this.state);
        
        this.getCurrentUser();
        this.getUsers();
        // if (this.state.currentUser !== null)
        this.getCurrentLocation();
    }

    componentDidUpdate = (prevProps, prevState) => {
        console.log("Component Updated");
//         if (this.state.currentUser.recentLocation === null) {
//             this.getCurrentLocation();
//         }
    }

    getCurrentUser = () => {
        API
            .getUserBySession(this.props.token)
            .then(res => {
                console.log("%cGot Token User", "color: green; font-weight: bold", res.data);
                this.setState({ currentUser: res.data});
            })
            .catch(err => console.log(err));
    }

    getUsers = () => {
        console.log("Get All Users");
        API
            .getUsers()
            .then(res => {
                console.log("%cGot All Users", "color: green; font-weight: bold", res.data);
                this.setState({ users: res.data});
                this.getCurrentUser();
            })
            .catch(err => console.log(err));
    }

    getCurrentLocation = () => {
        console.log("This is currentUser: ", this.state.currentUser);
        // console.log("location: ", location);
        getLocation()
            .then(location => {
                console.log("This is location: ", location);
                let updatedUser = this.state.currentUser;
                console.log("This is updatedUser: ", updatedUser);
                updatedUser.recentLocation = location;

                this.setState({currentUser: updatedUser});
                this.setCurrentLocation(location);
            })
            .catch(err => {
                console.log(err);
            });
    }

    // updateUsers = () => {
    //     let updatedCurrentUser;
    //     let updatedUsers;
        
    //     API
    //         .getUsers()
    //         .then(res => {
    //             console.log("%cUpdating Users", "color: green; font-weight: bold", res.data);

    //             for (let i=0; i < res.data.length; i++) {
    //                 for (let keys in res.data[i]) {
    //                     if (keys === "_id")
    //                         if (res.data[i]._id === this.state.currentUser._id)
    //                             updatedCurrentUser = this.state.users[i];
    //                 }
    //             }
    //             updatedUsers = res.data;
    //             console.log("current user: ", updatedCurrentUser);
    //         })
    //         .then( () => {
    //             this.setState({
    //                 currentUser: updatedCurrentUser ,
    //                 users: updatedUsers,
                    
    //             });
    //         })
    //         .catch(err => console.log(err));
        
    // }

    setRedirect = () => {
        this.setState({
            redirect: true
        });
    }

    renderActiveChats = () => {
        if (this.state.users === undefined || this.state.users === null || this.state.currentUser === null) return;

        let activeUsers = this.state.users
            .filter((user) => user.isActive);

        let activeChats = activeUsers
            .filter((user) => this.state.currentUser.acceptedChats.indexOf(user._id) !== -1);
        
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
        console.log("%cRendering Near Chats", "color: hotpink; font-weight: bold");
        if (this.state.users === undefined || this.state.users === null || this.state.currentUser === null) return;
        
        let activeUsers = this.state.users
            .filter((user) => user.isActive 
                && this.state.currentUser.acceptedChats.indexOf(user._id) === -1
                && this.state.currentUser.pendingChats.indexOf(user._id) === -1
                && this.state.currentUser.requestedChats.indexOf(user._id) === -1 );
        
        let locatedUsers = activeUsers
            .filter((user) => user.recentLocation);

        console.groupCollapsed("%cUser Distances", "color: purple; font-weight: bold");


        let nearChats = locatedUsers
            .filter((user) => {
                if (this.state.currentUser.recentLocation)
                    return inRadius(this.state.currentUser.recentLocation, user.recentLocation)          
            });

        console.groupEnd();
        
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
        if (this.state.users === undefined || this.state.users === null || this.state.currentUser === null) return;
        
        let activeUsers = this.state.users
            .filter((user) => user.isActive);
        
        let pendingChats = activeUsers
            .filter((user) => this.state.currentUser.pendingChats.indexOf(user._id) !== -1);

        let requestedChats = activeUsers
            .filter((user) => this.state.currentUser.requestedChats.indexOf(user._id) !== -1);

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
    setCurrentLocation = ({latitude, longitude}) => {
        // console.log("Home Page: ", latitude, longitude);
        if (this.state.users) {  
            console.log("Making request to set location...");
            API.updateLocationUser(this.state.currentUser._id, latitude, longitude)
            .then(res => {
            console.log("Got response for setting location: ", res);
            })
            .catch(err => console.log(err));;
        }
    }

    handleActiveChat = (id) => {
        console.log("handling active chat: ", id);
    }

    handleRequestChat = (id) => {
        console.log("request id1: ", this.state.currentUser._id);
        console.log("request id2: ", id);
        API.updateRequestUser(this.state.currentUser._id, id)
            .then(res => {
                console.log("Got to Res", res);

                socket.emit("sendUpdate");
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
        API.updateCancelUser(this.state.currentUser._id, id)
            .then(res => {
                console.log("Got to Res", res);

                socket.emit("sendUpdate");
                this.getUsers();
            })
            .catch(err => console.log(err));

        console.log("handling cancel chat: ", id);
    }

    handleApprove = (id) => {
        API.updateActiveUser(this.state.currentUser._id, id)
            .then(res => {
                console.log("Got to Res", res);

                socket.emit("sendUpdate");
                this.getUsers();
            })
            .catch(err => console.log(err));

        console.log("handling approve chat: ", this.state.currentUser._id, id);
    }

    renderRedirect = () => {
        console.log("Current Redirect path: " + this.state.path);
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
        </div>

        )
    }
}
export default Home;
