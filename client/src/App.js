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
import ChatPage from './components/pages/Chat/index';
import { getFromStorage } from "./utils/storage";
import { Navbar } from "./components/Navbar";
import EditProfile from './components/pages/EditProfile/index'
// import FileUpload from "./components/pages/EditProfile/FileUpload"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      user: null
    };
  };

  componentDidMount() {
    console.log(`%c➤ Rendering (%s)`, "color: crimson; font-weight: bold;", "App", "\n", this.props, "\n", this.state);
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
              user: json.userId,
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
    if (getFromStorage('the_main_app') === "" && this.state.token !== null) {
      this.setState({
        token: null
      });
    }
    if (!this.state.token) {
      console.log("No token...")
      return (<Landing />);
    } else if (this.state.token) {
      console.log("Received the token!!!")
      return (<Home token={this.state.token} />)
    }
  }

  checkTokenChat = () => {
    if (!this.state.token) {
      console.log("No token...")
      return (<Landing />);
    } else if (this.state.token) {
      console.log("Received the token!!!")
      return (<ChatPage token={this.state.token} />)
    }
  }

  checkTokenProfile = () => {
    if (!this.state.token) {
      console.log("No token...")
      return (<Landing />);
    } else if (this.state.token) {
      console.log("Received the token!!!")
      return (<EditProfile token={this.state.token} />)
    }
  }

  render() {
    console.log(this.props);
    return (
      <Router>
        <div>
          {/* <Test token={this.state.token}></Test> */}
          <Navbar token={this.state.token} />
            <Route exact path ="/" render={this.checkTokenHome}/>
            <Route exact path="/signup" component ={SignUp} />
            <Route exact path="/login" component ={Login} />
            <Route exact path="/api" component={API} />
            <Route exact path="/profile" component ={Profile} />  
            {/* <Route exact path='/editprofile' component={FileUpload}/> */}
            <Route exact path ="/home" render={this.checkTokenHome} />
            {/* <Route exact path="/upload" component={FileUpload}/> */}
            {/* <Route exact path ="/chat" render={this.checkTokenChat}/> */}

            <Route exact path ="/chat" component={ChatPage}/>            
            <Route exact path ="/editProfile" component={this.checkTokenProfile}/>
        </div>
      </Router>
    );
  }

}

export default App;
