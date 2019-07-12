import React, { Component } from 'react';
import api from "./utils/API";


class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: "Lindsey"
        };
    };

    componentDidMount() {
        console.log(`%c➤ Rendering (%s)`, "color: crimson; font-weight: bold;", "Test", "\n", this.props, "\n", this.state);
    }

    getUserById = (id) => {
        if (id === null || id === "") { return; }
        
        api
            .getUserBySession(id)
            .then(res => {
                console.log("%cGot Token User", "color: green; font-weight: bold", res.data);
                // this.setState({ data: res.data});
            })
            .catch(err => console.log(err));
    };

    render() {

        return (
            <div style={{color: "white", marginTop: "200px"}}>
                This is the Test Component
                {this.getUserById(this.props.token)}
            </div>
        );
    }
}

export default Test;
