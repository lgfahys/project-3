import React, { Component } from "react";

// import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon, MDBBtn, MDBScrollbar } from "mdbreact";
//import "./ChatPage.css";

import { socket } from "../../Navbar";
import ChatUser from "./components/ChatUser"
import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
// import io from "socket.io-client";

// var socket; 

class ChatPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: [],
        };


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
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''});

        }

        this.changeMessage = ev => {
            this.setState({message: ev.target.value})
        }
    }

    componentDidMount = () => {
        console.log(`%c➤ Rendering (%s)`, "color: crimson; font-weight: bold;", "Chat", "\n", this.props, "\n", this.state);

        socket.emit("setLocation");
    }
    


    render() {
        return (
            <Container className="chatContainer">
                <ChatUser />
                <ChatBody messages={this.state.messages}/>
                <ChatInput changemessage={this.changeMessage} message={this.state.message} sendmessage={this.sendMessage} />
            </Container>
        )
    }
}
export default ChatPage;

