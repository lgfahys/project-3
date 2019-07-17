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
            // <Container className="chatContainer">
            //     <ChatUser />
            //     <ChatBody messages={this.state.messages}/>
            //     <ChatInput changemessage={this.changeMessage} message={this.state.message} sendmessage={this.sendMessage} />
            // </Container>
            <div className="container-chat container">
            <div className="row chat-window col-xs-4 col-md-6">
                <div className="chat-scope col-xs-12 col-md-12">
                    <div className="panel panel-default">
                        <div className="panel-heading top-bar">
                            <div className="col-md-8 col-xs-8">
                                <h3 className="panel-title">Chatter - Miguel</h3>
                            </div>
                        </div>
                            
                        <div className="panel-body msg_container_base">
                            <div className="row msg_container base_sent">
                                <div className="col-md-10 col-xs-10">
                                    <div className="messages msg_sent">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " />
                                </div>
                            </div>
                            <div className="row msg_container base_receive">
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " />
                                </div>
                                <div className="col-md-10 col-xs-10">
                                    <div className="messages msg_receive">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                            </div>
                            <div className="row msg_container base_receive">
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " />
                                </div>
                                <div className="col-xs-10 col-md-10">
                                    <div className="messages msg_receive">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                            </div>
                            <div className="row msg_container base_sent">
                                <div className="col-xs-10 col-md-10">
                                    <div className="messages msg_sent">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " />
                                </div>
                            </div>
                            <div className="row msg_container base_receive">
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " />
                                </div>
                                <div className="col-xs-10 col-md-10">
                                    <div className="messages msg_receive">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                            </div>
                            <div className="row msg_container base_sent">
                                <div className="col-md-10 col-xs-10 ">
                                    <div className="messages msg_sent">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " />
                                </div>
                            </div>

                            <div className="row msg_container base_sent">
                                <div className="col-md-10 col-xs-10 ">
                                    <div className="messages msg_sent">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " />
                                </div>
                            </div>
                            <div className="row msg_container base_sent">
                                <div className="col-md-10 col-xs-10 ">
                                    <div className="messages msg_sent">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " />
                                </div>
                            </div>
                            <div className="row msg_container base_sent">
                                <div className="col-md-10 col-xs-10 ">
                                    <div className="messages msg_sent">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " />
                                </div>
                            </div>
                            <div className="row msg_container base_sent">
                                <div className="col-md-10 col-xs-10 ">
                                    <div className="messages msg_sent">
                                        <p>that mongodb thing looks good, huh?
                                        tiny master db, and huge document store</p>
                                        <time datetime="2009-11-13T20:00">Timothy • 51 min</time>
                                    </div>
                                </div>
                                <div className="col-md-2 col-xs-2 avatar">
                                    <img src="http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg" className=" img-responsive " />
                                </div>
                            </div>


                        </div>


                        <div className="panel-footer">
                            <div className="input-group">
                                <input id="btn-input" type="text" className="form-control input-sm chat_input" placeholder="Write your message here..." />
                                <span className="input-group-btn">
                                <button className="btn btn-dark gray btn-sm" id="btn-chat">Send</button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

        </div>






        )
    }
}
export default ChatPage;

