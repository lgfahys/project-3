import React, { Component } from "react";

import "./media.css";
import "./style.css";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody /*, MDBIcon */ } from 'mdbreact';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../../Navbar";
// import Navbar from "../../Navbar/loggedOut";
// import NavLI from "../../Navbar/loggedIn";
import S3FileUpload from 'react-s3';

//Optional Import
// import { uploadFile } from 'react-s3';
//import { Component } from 'react';
// require('dotenv').config()
// import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

//PASS Keys here, but DONT PUSH TO GITHUB IF NOT SECURED
const config = {
    bucketName: 'chatterproject',
    dirName: 'photos', /* optional */
    region: 'us-east-1',
    accessKeyId: 'removed',
    secretAccessKey: 'removed',
}


class FileUpload extends Component {
  
constructor(props){
  super(props);
  this.state = {
    isLoading: true,
    token: '',
    signUpError: '',
    signUpEmail: '',
    signUpPassword: '',
    signUpGender: '',
    // signUpBirthDate: '',
    signUpPhone: '',
    signUpName: '',
    redirect: false,
    startDate: new Date()
  };
  this.handleChange = this.handleChange.bind(this);
  
};
handleChange(date) {
  this.setState({
    startDate: date
  });
}


componentDidMount = () => {
  
  
  console.log("Node", process.env);
  console.log("Node", process.env.API_URL);
}
upload(e){
  
  console.log(e.target.files[0]);
  S3FileUpload
  .uploadFile(e.target.files[0], config)
  .then((data)=>{
  console.log(data)
  console.log(data.location)
  })
  .catch((err)=>{
    alert(err);
  })
}
getPickerValue = (value) => {
  console.log(value);
}

renderRedirect = () => {
// if (this.state.redirect) {
//   return <Redirect to='/' />
// }
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

render(){
  return(
    <div className="App">
      <Navbar />
      <Container fluid>
        <Row className="signUpRow"> 
        <Col xs={12} md={2} lg={4}></Col>
          <Col xs={12} md={8} lg={4}>
            <MDBCard>
              <MDBCardBody>
                <form>
                  <div className="text-center">
                        <h3 className="mb-5">
                          <strong>Edit Profile</strong>
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
                  <div>
      
      <h1>{process.env.API_URL}</h1>
      <div className="input-group">
  <div className="input-group-prepend">
    
  </div>
  <div className="custom-file">
    <input
    onChange={this.upload}
      type="file"
      className="custom-file-input"
      id="inputGroupFile01"
      aria-describedby="inputGroupFileAddon01"
    />
    <label className="custom-file-label " id="fileuploadinput" htmlFor="inputGroupFile01">
      Upload Your Photo
    </label>
  </div>
</div>
      
      
    </div>
                    <MDBInput
                    id="mdbinput"
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
                    id="mdbinput"
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
                    id="mdbinput"
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
                    id="mdbinput"
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
                    id="mdbinput"
                      label="Your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      value={this.signUpPassword}
                      onChange={this.onTextboxChangeSignUpPassword}
                    />
                  </div>
                  <MDBInput
                  id="mdbinput"
                      label="Your Bio"
                      icon="align-left"
                      group
                      type="text"
                      validate
                      value={this.signUpPassword}
                      onChange={this.onTextboxChangeSignUpPassword}
                    />
                    <MDBInput
                    id="mdbinput"
                      label="Enter Your DOB MM/DD/YYYY"
                      icon="calendar-alt"
                      group
                      type="text"
                      validate
                      value={this.signUpPassword}
                      onChange={this.onTextboxChangeSignUpPassword}
                    />

                  <div className="text-center py-4 mt-3">
                  {this.renderRedirect()}
                    <MDBBtn onClick={this.onSignUp} href="/">
                      Save Changes
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
    
  )
}


}

export default FileUpload;