import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

// Pages and Components
import Landing from './components/pages/Landing';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Home from './components/pages/Home';


class App extends Component {
  
  render() {
    return (
      <Router>
        <Route exact path ="/" component = {Landing}/>
        <Route exact path="/signup" component ={SignUp} />
        <Route exact path="/login" component ={Login} />
        <Route exact path ="/home" component ={Home} />
      </Router>
    );
  }

}


export default App;
