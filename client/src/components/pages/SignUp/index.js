import React, { Component } from "react";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import "./style.css";
import "./media.css";
import { Redirect } from 'react-router-dom';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class signUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      signUpError: '',
      signUpEmail: '',
      signUpPassword: '',
      signUpGender: '',
      // signUpBirthDate: '',
      signUpPhone: '',
      signUpName: '',
      recentLocation: {
        latitude : null,
        longitude : null
      },
      redirect: false
    };
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/login' />
    }
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
    // console.log(this.state.signUpEmail);
  };

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
    // console.log(this.state.signUpPassword);
  };

  onTextboxChangeSignUpGender(event) {
    this.setState({
      signUpGender: event.target.value
    });
    // console.log(this.state.signUpGender);
  };

  // onTextboxChangeSignUpBirthDate(event) {
  //   this.setState({
  //     signUpBirthDate: event.target.value
  //   });
  //   // console.log(this.state.signUpBirthDate);
  // };

  onTextboxChangeSignUpPhone(event) {
    this.setState({
      signUpPhone: event.target.value
    });
    // console.log(this.state.signUpPhone);
  };

  onTextboxChangeSignUpName(event) {
    this.setState({
      signUpName: event.target.value
    });
    console.log(this.state.signUpName);
  };

  onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
  onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
  onTextboxChangeSignUpPhone = this.onTextboxChangeSignUpPhone.bind(this);
  // onTextboxChangeSignUpBirthDate = this.onTextboxChangeSignUpBirthDate.bind(this);
  onTextboxChangeSignUpName = this.onTextboxChangeSignUpName.bind(this);
  onTextboxChangeSignUpGender = this.onTextboxChangeSignUpGender.bind(this);

  onSignUp() {
    this.setState({
      isLoading: true,
    });
    // Post request to backend
    fetch('/api/accounts/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.signUpName,
        email: this.state.signUpEmail,
        password: this.state.signUpPassword,
        gender: this.state.signUpGender,
        // birthdate: this.state.signUpBirthDate,
        phone: this.state.signUpPhone
      }),
    }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: '',
            signUpPassword: '',
            signUpGender: '',
            // signUpBirthDate: '',
            signUpPhone: '',
            signUpName: '',
            redirect: true
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onSignUp = this.onSignUp.bind(this);

  render() {
    return (
      <div className="App">
      {this.renderRedirect()}
      <Container fluid>
        <Row className="signUpRow"> 
        <Col xs={12} md={2} lg={4}></Col>
          <Col xs={12} md={8} lg={4}>
            <MDBCard>
              <MDBCardBody>
                <form>
                  <div className="text-center">
                        <h3 className="dark-grey-text mb-5">
                          <strong>Sign up</strong>
                        </h3>
                      </div>
                      <div className="alert-text">
                        {
                          (this.state.signUpError) ? (
                            <p>{this.state.signUpError}</p>
                          ) : (null)
                        } 
                      </div>
                  <div className="grey-text">
                    <MDBInput
                      label="First Name"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      value={this.signUpName}
                      onChange={this.onTextboxChangeSignUpName}
                    />
                    <MDBInput
                      label="Email"
                      icon="envelope"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      value={this.signUpEmail}
                      onChange={this.onTextboxChangeSignUpEmail}
                    />
                    <MDBInput
                      label="Phone"
                      icon="phone"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      value={this.signUpPhone}
                      onChange={this.onTextboxChangeSignUpPhone}
                    />
                    <MDBInput
                      label="Gender"
                      icon="user"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      value={this.signUpGender}
                      onChange={this.onTextboxChangeSignUpGender}
                    />
                    <MDBInput
                      label="Your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      value={this.signUpPassword}
                      onChange={this.onTextboxChangeSignUpPassword}
                    />
                  </div>
                  <div className="text-center py-4 mt-3">
                    <MDBBtn 
                    onClick={this.onSignUp} 
                    to="/"
                    >
                      Sign Up
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </Col>
          <Col xs={12} md={2} lg={4}></Col>
        </Row>
      </Container>
      </div>
    );
  };
};

export default signUpPage;
