import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

// Pages and Components
import Landing from './components/pages/Landing';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import NavLO from "./components/nav/loggedOut";

class App extends Component {
  
  render() {
    return (
      <Router>
        <div>
          <NavLO />
          <Switch>
            <Route exact path ="/" component = {Landing}/>
            <Route exact path="/signup" component = {SignUp} />
            <Route exact path="/login" component = {Login} />
          </Switch>
        </div>
      </Router>
    );
  }

}


export default App;
