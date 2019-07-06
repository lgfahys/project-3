import React, { Component } from "react";

import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon, MDBBtn, MDBScrollbar } from "mdbreact";
//import "./ChatPage.css";

import ChatUser from "./components/ChatUser"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ChatBody from "./components/ChatBody"
import ChatInput from "./components/ChatInput"
import io from "socket.io-client";

class ChatPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };

        this.socket = io('http://localhost:3001');

        this.socket.on('RECEIVE_MESSAGE', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''});

        }

        this.changeMessage = ev => {
            this.setState({message: ev.target.value})
        }
    }

    render() {
        return (
            <Container className="chatContainer">
                <ChatUser />
                <ChatBody messages={this.state.messages}/>
                <ChatInput changeMessage={this.changeMessage} message={this.state.message} sendMessage={this.sendMessage} />
            </Container>
        )
    }
}
export default ChatPage;

