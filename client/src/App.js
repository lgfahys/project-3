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
import GeoPage from './components/pages/Geo';
//import Chat from "./components/pages/Chat/index.js"

import ChatPage from './components/pages/Chat/index';

// import io from 'socket.io-client';
// const socket = io("http://localhost:3001");

class App extends Component {
  
  render() {
    return (
      <Router>
        <Route exact path ="/" component = {Landing}/>
        <Route exact path="/signup" component ={SignUp} />
        <Route exact path="/login" component ={Login} />
        <Route exact path="/api" component={API} />
        <Route exact path="/profile" component ={Profile} />
        <Route exact path ="/home" component ={Home} />
        <Route exact path ="/chat" component ={ChatPage}/>
        <Route exact path ="/geo" component ={GeoPage}/>
      </Router>
    );
  }

}


export default App;
