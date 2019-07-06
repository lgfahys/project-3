import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "./App.css";

// Pages and Components

import Landing from './components/pages/Landing';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import API from './components/pages/API';
// import Chat from './components/pages/Chat';
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
        <Route exact path ="/home" component ={Home} />
        <Route exact path ="/chat" component ={ChatPage}/>
      </Router>
    );
  }

}


export default App;
