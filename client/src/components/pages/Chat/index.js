import React, { Component } from "react";
import io from "socket.io-client";
import './styles.css';

class Chat extends Component {
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
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                                <br/>
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    // componentDidMount = () => {
    //     // console.log(this.props.socket);
    //     this.props.socket.on("connect", () => {
    //         console.log(this.props.socket.id);
    //     });
        
    //     this.props.socket.on("messageFromServer", (dataFromServer) => {
    //         console.log(dataFromServer);
        
    //         this.props.socket.emit("dataToServer", {data: "Data from the Client [dataToServer]"});
    //         this.props.socket.emit("messageToServer", {data: "Data from the Client [messageToServer]"});
    //     });
    // };

    // state = () => {
    //     socket.on("messageToClients", (msg) => {
    //         console.log(msg);
    //         document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
    //     })
    // }

    // renderData = () => {
    //     if (this.state.data) {
    //         return (
    //             JSON.stringify(this.state.data, null, 2)
    //         );
    //     }
    // };

    // clearData = () => {
    //     this.setState({ data: null});
    // }

    // handleInputChange = event => {
    //     const { name, value } = event.target;
    //     this.setState({
    //         [name]: value
    //     });
    // };

    // render() {
    //     return(
    //         <div className="container chat-body">
    //             <div className="row">
    //                 <div className="col-sm-12">
    //                     <form id="message-form">
    //                         <div className="col-sm-9">
    //                             <input 
    //                                 id="user-message"
    //                                 name="message"
    //                                 type="text"
    //                                 onChange={this.handleInputChange}
    //                                 value={this.state.message}
    //                                 placeholder="Enter your message"
    //                             />
    //                         </div>
    //                         <div className="col-sm-2">
    //                             <input
    //                                 className="btn btn-primary"
    //                                 type="submit"
    //                                 value="Send!"
    //                             />

    //                         </div>
    //                     </form>
    //                     <ul id="messages">
    //                         {this.state.message}
    //                     </ul>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }
}

export default Chat;