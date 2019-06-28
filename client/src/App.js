import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "./media.css"
import Main from './components/main'
import SignUp from './components/signup'

class App extends Component {
  
  render() {
    return (
      <Router>
      
        
        <Route exact path ="/" component = {Main}/>
        <Route exact path="/login" component ={SignUp} />
     
      </Router>
    );
  }
}

export default App;
