import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

// Pages and Components
import Landing from './components/pages/Landing';
import SignUp from './components/pages/SignUp';

class App extends Component {
  
  render() {
    return (
      <Router>
        <Route exact path ="/" component = {Landing}/>
        <Route exact path="/login" component ={SignUp} />
      </Router>
    );
  }

}


export default App;
