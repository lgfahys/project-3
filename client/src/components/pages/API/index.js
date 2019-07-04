import React, { Component } from "react";
import api from "../../../util/API";

import "./styles.css";


class API extends Component {
    
    state = {
        data: null,
        field1: ""
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

                {/* <div className="form-group"> */}
                    <input 
                    className="form-control" 
                    value={this.state.field1}
                    onChange={this.handleInputChange}
                    name="field1"
                    placeholder="id"
                    />
                    
                {/* </div> */}
                

                <pre>
                    {this.renderData()}
                </pre>
            </div>
        );
    }
}

export default API;