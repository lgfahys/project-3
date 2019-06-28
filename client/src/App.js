import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import "./media.css"
import Main from './components/main'


class App extends Component {
  
  render() {
    return (
      <Router>
       <div>
         <Main />
        <Route exact path ="/" components = {Main}/>

       </div>
      </Router>
    );
  }
}

export default App;
