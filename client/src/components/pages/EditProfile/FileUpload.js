import { } from "dotenv/config";
import React, { Component } from "react";

import "./media.css";
import "./style.css";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody /*, MDBIcon */ } from 'mdbreact';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Navbar from "../../Navbar";
// import Navbar from "../../Navbar/loggedOut";
// import NavLI from "../../Navbar/loggedIn";
import S3FileUpload from 'react-s3';
import "react-datepicker/dist/react-datepicker.css";
// AWS s3 contianer vars


//import config from '../../../keys'

//Optional Import
// import { uploadFile } from 'react-s3';
//import { Component } from 'react';
// require('dotenv').config()
// import DatePicker from "react-datepicker";




//PASS Keys here, but DONT PUSH TO GITHUB IF NOT SECURED

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  dirName: process.env.REACT_APP_DIR_NAME, 
  region: 'us-east-1',
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
}



class FileUpload extends Component {
  
constructor(props){
  super(props);
  this.state = {
    isLoading: true,
    token: '',
    signUpError: '',
    updateEmail: '',
    updatePassword: '',
    updateGender: '',
    // signUpBirthDate: '',
    updatePhone: '',
    updateName: '',
    redirect: false,
    startDate: new Date(),
    userImg: ''
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
  let response = data.location
  
  console.log(response)
})
  .catch((err)=>{
    alert(err);
  })
  let img = e.target.value
  console.log(e.target.value)
return(img)
}


getPickerValue = (value) => {
  console.log(value);
}
/*onTextboxChangeImg(event){
  this.setState({
    userImg: event.target.value
  
  })
 
}*/


renderRedirect = () => {
// if (this.state.redirect) {
//   return <Redirect to='/' />
// }
}

onTextboxChangeupdateEmail(event) {
this.setState({
  updateEmail: event.target.value
});
// console.log(this.state.updateEmail);
};

onTextboxChangeupdatePassword(event) {
this.setState({
  updatePassword: event.target.value
});
// console.log(this.state.updatePassword);
};

onTextboxChangeupdateGender(event) {
this.setState({
  updateGender: event.target.value
});
// console.log(this.state.updateGender);
};

// onTextboxChangeSignUpBirthDate(event) {
//   this.setState({
//     signUpBirthDate: event.target.value
//   });
//   // console.log(this.state.signUpBirthDate);
// };

onTextboxChangeupdatePhone(event) {
this.setState({
  updatePhone: event.target.value
});
// console.log(this.state.updatePhone);
};

onTextboxChangeupdateName(event) {
this.setState({
  updateName: event.target.value
});
console.log(this.state.updateName);
};

onTextboxChangeupdateEmail = this.onTextboxChangeupdateEmail.bind(this);
onTextboxChangeupdatePassword = this.onTextboxChangeupdatePassword.bind(this);
onTextboxChangeupdatePhone = this.onTextboxChangeupdatePhone.bind(this);
// onTextboxChangeSignUpBirthDate = this.onTextboxChangeSignUpBirthDate.bind(this);
onTextboxChangeupdateName = this.onTextboxChangeupdateName.bind(this);
onTextboxChangeupdateGender = this.onTextboxChangeupdateGender.bind(this);



onEditPage() {
this.setState({
  isLoading: true,
});
// Post request to backend
fetch('/api/accounts/update', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: this.state.updateName,
    email: this.state.updateEmail,
    password: this.state.updatePassword,
    gender: this.state.updateGender,
    // birthdate: this.state.signUpBirthDate,
    phone: this.state.updatePhone,
    //userImg: image1
  }),
}).then(res => res.json())
  .then(json => {
    console.log('json', json);
    if (json.success) {
      this.setState({
        signUpError: json.message,
        isLoading: false,
        updateEmail: '',
        updatePassword: '',
        updateGender: '',
        // signUpBirthDate: '',
        updatePhone: '',
        updateName: '',
        userImg: '',
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

onEditPage = this.onEditPage.bind(this);

render(){
  return(
    <Container>
      {/* <Navbar /> */}
      
        <Row className="signUpRow" id="editRow"> 
        <Col xs={1} md={1} lg={1}></Col>
          <Col xs={12} md={10} lg={8}>
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
                      value={this.updateName}
                      onChange={this.onTextboxChangeupdateName}
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
                      value={this.updateEmail}
                      onChange={this.onTextboxChangeupdateEmail}
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
                      value={this.updatePhone}
                      onChange={this.onTextboxChangeupdatePhone}
                    />
                    
                    <MDBInput
                    id="mdbinput"
                      label="Your password"
                      icon="lock"
                      group
                      type="password"
                      validate
                      value={this.updatePassword}
                      onChange={this.onTextboxChangeupdatePassword}
                    />
                  </div>
                  <MDBInput
                  id="mdbinput"
                      label="Your Bio"
                      icon="align-left"
                      group
                      type="text"
                      validate
                      value={this.updatePassword}
                      onChange={this.onTextboxChangeupdatePassword}
                    />
                    <MDBInput
                    id="mdbinput"
                      label="Enter Your DOB MM/DD/YYYY"
                      icon="calendar-alt"
                      group
                      type="text"
                      validate
                      value={this.updatePassword}
                      onChange={this.onTextboxChangeupdatePassword}
                    />
                    <MDBInput
                    id="mdbinput"
                      label="Enter Your DOB MM/DD/YYYY"
                      icon="calendar-alt"
                      group
                      type="text"
                      validate
                      value={this.updatePassword}
                      onChange={this.onTextboxChangeImg}
                    />

                  <div className="text-center py-4 mt-3">
                  {this.renderRedirect()}
                    <MDBBtn onClick={this.onEditPage} href="/">
                      Save Changes
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </Col>
          <Col xs={1} md={1} lg={1}></Col>
         
        </Row>
    
        </Container>
    
  )
}


}

export default FileUpload;