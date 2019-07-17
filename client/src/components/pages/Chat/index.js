import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./style.css";
// import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon, MDBBtn, MDBScrollbar } from "mdbreact";
//import "./ChatPage.css";

import { socket } from "../../Navbar";
// import ChatUser from "./components/ChatUser"
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import ChatBody from "./components/ChatBody";
// import ChatInput from "./components/ChatInput";
import API from "../../../utils/API";
// import io from "socket.io-client";

// var socket; 

class ChatPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            messageUser: null,
            room: this.props.location.search.substr(1),
            message: "",
            messages: [],
            loaded: false,
            redirect: false
        };

        socket.emit("join", {room: this.state.room} );

        socket.on('RECEIVE_MESSAGE', function(data){
            console.log("recieved message");
            addMessage(data);
        });

        socket.on("announceLocation", (data) => {
            console.log("Got DATA to announce: ", data);
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            socket.emit('SEND_MESSAGE', {
                author: this.state.currentUser._id,
                room: this.state.room,
                message: this.state.message
            })
            this.setState({message: ''});
            console.log(this.props);
        
        }

        this.changeMessage = ev => {
            this.setState({message: ev.target.value})
        }
    }

    componentDidMount = () => {
        console.log(`%c➤ Rendering (%s)`, "color: crimson; font-weight: bold;", "Chat", "\n", this.props, "\n", this.state);

        const initializeUserData = async () => {
            const users = API.getRoomById(this.state.room);
            const tokenUser = API.getUserBySession(this.props.location.state.token);
            
            try {
                
                let currentUser = null;
                let messageUser = null;

                const [ tokenUserResponse, usersResponse ] = await Promise.all([tokenUser, users]);
        
                usersResponse.data.users.forEach((element) => {
                    if (element._id === tokenUserResponse.data._id) {
                        currentUser = element;
                    }
                    else {
                        messageUser = element;
                    }
                    this.setState({ currentUser, messageUser });
                });
                
            } catch (error) {
                console.log("Error", error);
            }
        
        };
        
        initializeUserData();
        this.setState({ loaded: true });
        
        socket.emit("setLocation");
    }
    
    setRedirect = () => {

        const updateUserData = async () => {
            const room = API.deleteRoomById(this.state.room);
            const users = API.deleteActiveUser(this.state.currentUser._id, this.state.messageUser._id);

            try {
                const [ roomResponse, usersResponse ] = await Promise.all([room, users]);

            } catch (error) {
                console.log("Error", error);
            }
        };
        
        updateUserData();
        this.setState({ redirect: true });
    }
    
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/home" />;
        }
    }

    render() {
        // { if (this.state.currentUser === null ) return; }

        return (
            // <Container className="chatContainer">
            //     <ChatUser />
            //     <ChatBody messages={this.state.messages}/>
            //     <ChatInput changemessage={this.changeMessage} message={this.state.message} sendmessage={this.sendMessage} />
            // </Container>
            <div className="container-chat container">
                {this.renderRedirect()}
                
            <div className="row chat-window col-xs-4 col-md-6">
                <div className="chat-scope col-xs-12 col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading top-bar">
                            <div className="col-md-12 col-xs-12">
                                <h3 className="panel-title">Chatter - {this.state.messageUser ? this.state.messageUser.name : "" }
                                <button 
                                    onClick={() => this.setRedirect()}
                                    className="btn btn-outline-danger btn-end"
                                >
                                    X
                                </button>
                                </h3>
                            </div>
                        </div>
                            
                        <div className="panel-body msg_container_base">
                            {this.state.messages
                            .filter((message) => message.room === this.state.room)
                            .map((message, index) => {
                                if (this.state.currentUser._id === message.author) {
                                    return (
                                        <div className="row msg_container base_sent" key={index}>
                                            <div className="col-md-10 col-xs-10">
                                                <div className="messages msg_sent">
                                                    <p>{message.message}</p>
                                                    <time dateTime="2009-11-13T20:00">{this.state.messageUser.name} •</time>
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-xs-2 avatar">
                                                <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " alt="none"/>
                                            </div>
                                        </div>
                                    );
                                }
                                else {
                                    return (
                                        <div className="row msg_container base_receive" key={index}>
                                            <div className="col-md-2 col-xs-2 avatar">
                                                <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " alt="none"/>
                                            </div>
                                            <div className="col-md-10 col-xs-10">
                                                <div className="messages msg_receive">
                                                    <p>{message.message}</p>
                                                    <time dateTime="2009-11-13T20:00">{this.state.currentUser.name} •</time>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            })}

                        </div>


                        <div className="panel-footer">
                            <form className="input-group">
                                <input 
                                    id="btn-input"
                                    type="text"
                                    className="form-control input-sm chat_input"
                                    placeholder="Write your message here..." 
                                    value={this.state.message}
                                    onChange={(ev) => this.changeMessage(ev)}
                                />
                                <span className="input-group-btn">
                                    <button
                                        className="btn btn-primary gray btn-sm"
                                        type="submit"
                                        onClick={this.sendMessage}
                                    >
                                        Send
                                    </button>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            

        </div>






        )
    }
}
export default ChatPage;

