import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "./App.css";

// Pages and Components

import Profile from './components/pages/Profile';
import Landing from "./components/pages/Landing/index.js";
import SignUp from "./components/pages/SignUp/index.js";
import Login from "./components/pages/Login/index.js";
import Home from "./components/pages/Home/index.js";
import API from './components/pages/API';
//import Chat from "./components/pages/Chat/index.js"

import ChatPage from './components/pages/Chat/index';
import {
  getFromStorage
} from "./utils/storage";


// import io from 'socket.io-client';
// const socket = io("http://localhost:3001");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: ''
    };
  };

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/accounts/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  };

  // checking if we have received a token and returning the appropriate screen
  checkTokenHome = () => {
    if (!this.state.token) {
      console.log("No token...")
      return (<Landing />);
    } else if (this.state.token) {
      console.log("Received the token!!!")
      return (<Home />)
    }
  }

  checkTokenChat = () => {
    if (!this.state.token) {
      console.log("No token...")
      return (<Landing />);
    } else if (this.state.token) {
      console.log("Received the token!!!")
      return (<ChatPage />)
    }
  }

  render() {

    return (
      <Router>
        <Route exact path ="/" render={this.checkTokenHome}/>
        <Route exact path="/signup" component ={SignUp} />
        <Route exact path="/login" component ={Login} />
        <Route exact path="/api" component={API} />
        <Route exact path="/profile" component ={Profile} />
        <Route exact path ="/home" render={this.checkTokenHome} />
        <Route exact path ="/chat" render={this.checkTokenChat}/>
      </Router>
    );
  }

}


export default App;
