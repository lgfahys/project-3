import React, { Component } from "react";
import api from "../../../util/API";

import "./styles.css";


class API extends Component {
    
    state = {
        data: null,
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

    getApiTest = () => {
        console.log("GET Test API Route @ API index.js");
        
        api
            .testapi()
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
                    onClick={this.getApiTest}
                >
                getApiTest()
                </button> 

                <button type="button" className="btn btn-primary"
                    onClick={this.getAllUsers}
                >
                getAllUsers()
                </button> 
                

                <pre>
                    {this.renderData()}
                </pre>
            </div>
        );
    }
}

export default API;