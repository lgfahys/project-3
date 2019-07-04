import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import "./App.css";

// Pages and Components
<<<<<<< HEAD
import Landing from './components/pages/Landing';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';
=======
import Landing from "./components/pages/Landing/index.js";
import SignUp from "./components/pages/SignUp/index.js";
import Login from "./components/pages/Login/index.js";
import Home from "./components/pages/Home/index.js";
//import Chat from "./components/pages/Chat/index.js"
import ChatPage from './components/pages/Chat/index';
>>>>>>> master

class App extends Component {
  
  render() {
    return (
      <Router>
        <Route exact path ="/" component = {Landing}/>
        <Route exact path="/signup" component ={SignUp} />
        <Route exact path="/login" component ={Login} />
<<<<<<< HEAD
        <Route exact path="/profile" component ={Profile} />
=======
        <Route exact path ="/home" component ={Home} />
        <Route exact path ="/chat" component ={ChatPage}/>
>>>>>>> master
      </Router>
    );
  }

}


export default App;
