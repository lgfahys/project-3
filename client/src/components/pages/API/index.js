import React, { Component } from "react";
import api from "../../../utils/API";

import "./styles.css";


class API extends Component {
    
    state = {
        data: null,
        field1: "",
        field2: ""
    };

    renderData = () => {
        if (this.state.data) {
            return (
                JSON.stringify(this.state.data, null, 2)
            );
        }
    };

    clearData = () => {
        this.setState({ data: null});
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    
    getApiTest = (data) => {
        console.log("GET Test API Route @ API index.js");
        console.log(data);
        api
            .getUserById(data)
            .then(res => {
                console.log("Got to [TEST] res", res);
                this.setState({ data: res.data});
            })
            .catch(err => console.log(err));
    }

    getAllUsers = () => {
        console.log("Get All Users");
        api.getUsers()
        .then(res => {
            console.log("Got to Res", res);
            this.setState({ data: res.data});

        })
        .catch(err => console.log(err));
    };

    getUserById = (id) => {
        api
            .getUserById(id)
            .then(res => {
                console.log("Got to [TEST] res", res);
                this.setState({ data: res.data});
            })
            .catch(err => console.log(err));
    };

    getUserByName = (name) => {
        api
            .getUserByName(name)
            .then(res => {
                console.log("Got to [TEST] res", res);
                this.setState({ data: res.data});
            })
            .catch(err => console.log(err));
    };

    getAllRooms = () => {
        console.log("Finding Rooms");
        api.getRooms()
        .then(res => {
            console.log("Got to Res", res);
            this.setState({ data: res.data});

        })
        .catch(err => console.log(err));
    };

    getRoomById = (id) => {
        api
            .getRoomById(id)
            .then(res => {
                console.log("Got to [TEST] res", res);
                this.setState({ data: res.data});
            })
            .catch(err => console.log(err));
    };

    getRoomByName = (name) => {
        api
            .getRoomByName(name)
            .then(res => {
                console.log("Got to [TEST] res", res);
                this.setState({ data: res.data});
            })
            .catch(err => console.log(err));
    };

    getRoomByUser = (id) => {
        api
        .getRoomByUser(id)
        .then(res => {
            console.log("Got to [TEST] res", res);
            this.setState({ data: res.data});
        })
        .catch(err => console.log(err));
    };

    getRoomByUsers = (id1, id2) => {
        api
        .getRoomByUsers(id1, id2)
        .then(res => {
            console.log("Got to [TEST] res", res);
            this.setState({ data: res.data});
        })
        .catch(err => console.log(err));
    };

    getAllMessages = () => {
        api.getAllMessages()
        .then(res => {
            console.log("Got to Res", res);
            this.setState({ data: res.data});

        })
        .catch(err => console.log(err));
    };

    getMessagesByUserId = (id) => {
        api.getMessagesByUserId(id)
        .then(res => {
            console.log("Got to Res", res);
            this.setState({ data: res.data});

        })
        .catch(err => console.log(err));
    };

    getMessagesByRoomId = (id) => {
        api.getMessagesByRoomId(id)
        .then(res => {
            console.log("Got to Res", res);
            this.setState({ data: res.data});

        })
        .catch(err => console.log(err));
    };

    deleteAll = () => {
        api.deleteAll()
        .then(res => {
            console.log("Deleted all", res);
            this.setState({ data: null })
        })
        .catch(err => console.log(err));
    }

    render() {
        return(
            <div className="api-body">
                This is the API Page<br/>
                
                <button type="button" className="btn btn-primary"
                    onClick={this.clearData}
                >
                Clear()
                </button> 

                <button type="button" className="btn btn-primary"
                    onClick={() => this.getApiTest(this.state.field1)}
                >
                getApiTest()
                </button> 

                <button type="button" className="btn btn-primary"
                    onClick={this.getAllUsers}
                >
                getAllUsers()
                </button> 

                <button type="button" className="btn btn-primary"
                    onClick={() => this.getUserById(this.state.field1)}
                >
                getUserById()
                </button> 
                
                <button type="button" className="btn btn-primary"
                    onClick={() => this.getUserByName(this.state.field1)}
                >
                getUserByName()
                </button> 

                <button type="button" className="btn btn-primary"
                    onClick={this.getAllRooms}
                >
                getAllRooms()
                </button> 

                <button type="button" className="btn btn-primary"
                    onClick={() => this.getRoomById(this.state.field1)}
                >
                getRoomById()
                </button> 
                
                <button type="button" className="btn btn-primary"
                    onClick={() => this.getRoomByName(this.state.field1)}
                >
                getRoomByName()
                </button> 

                <button type="button" className="btn btn-primary"
                    onClick={() => this.getRoomByUser(this.state.field1)}
                >
                getRoomByUser()
                </button>

                <button type="button" className="btn btn-primary"
                    onClick={() => this.getRoomByUsers(this.state.field1, this.state.field2)}
                >
                getRoomByUsers()
                </button>

                <button type="button" className="btn btn-primary"
                    onClick={() => this.getAllMessages()}
                >
                getAllMessages()
                </button>

                <button type="button" className="btn btn-primary"
                    onClick={() => this.getMessagesByUserId(this.state.field1)}
                >
                getMessagesByUserId()
                </button> 
                
                <button type="button" className="btn btn-primary"
                    onClick={() => this.getMessagesByRoomId(this.state.field1)}
                >
                getMessagesByRoomId()
                </button>

                <button type="button" className="btn btn-primary"
                    onClick={() => this.deleteAll()}
                >
                clearDatabase()
                </button> 
                
                <input 
                className="form-control" 
                value={this.state.field1}
                onChange={this.handleInputChange}
                name="field1"
                placeholder="id"
                />

                <input 
                className="form-control" 
                value={this.state.field2}
                onChange={this.handleInputChange}
                name="field2"
                placeholder="id"
                />
                
                

                <pre>
                    {this.renderData()}
                </pre>
                
            </div>
        );
    }
}

export default API;