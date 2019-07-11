import React, { Component } from "react";
import "./style.css";
import "./media.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBModalFooter } from 'mdbreact';
import Navbar from "../../Navbar/loggedOut";
import { Redirect } from 'react-router-dom';
import {
  setInStorage
} from "../../../utils/storage"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      redirect: false
    };
  };

  componentDidMount = () => {
    console.log(`%c➤ Rendering (%s)`, "color: crimson; font-weight: bold;", "Login", "\n", this.props);
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/home' />
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
    // console.log(this.state.signInEmail);
  };

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
    // console.log(this.state.signInPassword);
  };

  onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
  onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);

  onSignIn() {
    // Grab state
    this.setState({
      isLoading: true,
    });
    // Post request to backend
    fetch('/api/accounts/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
            redirect: true
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignIn = this.onSignIn.bind(this);

  render() {
    return (
      <div className="App">
        <Navbar />
        <Container fluid>

          <Row className="loginRow">
          <Col sm= "1" md="4" lg="4">
              /</Col>
            <Col sm="12" md="4" lg="4">
              <MDBCard>
                <MDBCardBody className="mx-4">
                  <div className="text-center">
                    <h3 className="dark-grey-text mb-5">
                      <strong>Log in</strong>
                    </h3>
                  </div>
                  <div className="alert-text">
                        {
                          (this.state.signInError) ? (
                            <p>{this.state.signInError}</p>
                          ) : (null)
                        } 
                      </div>
                  <MDBInput
                    label="Your email"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    value={this.signInEmail}
                    onChange={this.onTextboxChangeSignInEmail}
                  />
                  <MDBInput
                    label="Your password"
                    group
                    type="password"
                    validate
                    containerClass="mb-0"
                    value={this.signInPassword}
                    onChange={this.onTextboxChangeSignInPassword}
                  />
                  <p className="font-small blue-text d-flex justify-content-end pb-3">
                    Forgot
                <a href="#!" className="blue-text ml-1">

                      Password?
                </a>
                  </p>
                  <div className="text-center mb-3">
                  {/* {this.renderRedirect()} */}
                    <MDBBtn
                      type="button"
                      rounded
                      className="btn-block z-depth-1a"
                      // href="/home"
                      onClick={this.onSignIn}
                    >
                      Sign in
                </MDBBtn>
                  </div>
                </MDBCardBody>
                <MDBModalFooter className="mx-5 pt-3 mb-1">
                  <p className="font-small grey-text d-flex justify-content-end">
                    Not a member?
                <a href="/signup" className="blue-text ml-1">
                      Sign Up
                </a>
                  </p>
                </MDBModalFooter>
              </MDBCard>
            </Col>
            <Col sm= "1" md="4" lg="4">
              /</Col>
          </Row>
        </Container>
      </div>
    )
  }
}
export default Login;