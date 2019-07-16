import React, { Component } from "react";

import "./media.css";
import "./style.css";
import { MDBInput, MDBBtn, MDBCard, MDBCardBody /*, MDBIcon */ } from 'mdbreact';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import API from "../../../utils/API";
// import Navbar from "../../Navbar";
// import Navbar from "../../Navbar/loggedOut";
// import NavLI from "../../Navbar/loggedIn";
// import S3FileUpload from 'react-s3';

//Optional Import
// import { uploadFile } from 'react-s3';
//import { Component } from 'react';
// require('dotenv').config()
// import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

//PASS Keys here, but DONT PUSH TO GITHUB IF NOT SECURED
// const config = {
//     bucketName: 'chatterproject',
//     dirName: 'photos', /* optional */
//     region: 'us-east-1',
//     accessKeyId: 'removed',
//     secretAccessKey: 'removed',
// }


class EditProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            token: '',
            editError: '',
            // editImage: '',
            editName: '',
            editEmail: '',
            editPassword: '',
            editGender: '',
            editPhone: '',
            editBio: '',
            startDate: ''
        };
    };

    componentDidMount = () => {
        console.log(`%c➤ Rendering (%s)`, "color: crimson; font-weight: bold;", "Edit Profile", "\n", this.props, "\n", this.state);
        
        this.getCurrentUserInfo();
    };


    // componentDidMount = () => {
    //     console.log("Node", process.env);
    //     console.log("Node", process.env.API_URL);
    // }

    // upload(e) {

    //     console.log(e.target.files[0]);
    //     S3FileUpload
    //         .uploadFile(e.target.files[0], config)
    //         .then((data) => {
    //             console.log(data)
    //             console.log(data.location)
    //         })
    //         .catch((err) => {
    //             alert(err);
    //         })
    // }

    // getPickerValue = (value) => {
    //     console.log(value);
    // }

    onTextboxChangeEditName = (event) => {
        this.setState({
            editName: event.target.value
        });
    };

    onTextboxChangeEditEmail = (event) => {
        this.setState({
            editEmail: event.target.value
        });
    };

    onTextboxChangeEditPhone = (event) => {
        this.setState({
            editPhone: event.target.value
        });
    };

    
    onTextboxChangeEditGender = (event) => {
        this.setState({
            editGender: event.target.value
        });
    };

    onTextboxChangeEditPassword = (event) => {
        this.setState({
            editPassword: event.target.value
        });
    };

    onTextboxChangeEditBirthDate = (event) => {
        this.setState({
            startDate: event.target.value
        });
    };

    onTextboxChangeEditBio = (event) => {
        this.setState({
            editBio: event.target.value
        });
    };

    getCurrentUserInfo = () => {
        API
            .getUserBySessionEditProfile(this.props.token)
            .then(res => {
                console.log("%cGot Token User", "color: green; font-weight: bold", res.data)
                // console.log("Where is harold? ", this.state)
                this.setState({
                    editName: res.data.name,
                    editEmail: res.data.email,
                    editPhone: res.data.phone,
                    editGender: res.data.gender,
                    editPassword: res.data.password,
                    startDate: res.data.birthdate,
                    editBio: res.data.bio
                });
            })
            .catch(err => console.log(err));
    };


    onEdit = () => {
        this.setState({
            isLoading: true,
        });
        console.log('NAME ', this.state.editName);
        console.log('EMAIL ', this.state.editEmail);
        console.log('PASSWORD ', this.state.editPassword);
        console.log('GENDER ', this.state.editGender);
        console.log('PHONE ', this.state.editPhone);
        console.log('BIRTH DATE ', this.state.startDate);
        console.log('BIO ', this.state.editBio);
        // Post request to backend
        fetch('/api/accounts/edit', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // image: this.editImage,
                name: this.state.editName,
                email: this.state.editEmail,
                password: this.state.editPassword,
                gender: this.state.editGender,
                phone: this.state.editPhone,
                birthdate: this.state.startDate,
                bio: this.state.editBio
            }),
        }).then(res => res.json())
            .then(json => {
                console.log('json', json);
                if (json.success) {
                    this.setState({
                        editError: json.message,
                        // image: this.editImage,
                        editName: this.state.editName,
                        editEmail:  this.state.editEmail,
                        editPassword: this.state.editPassword,
                        editGender: this.state.editGender,
                        editPhone: this.state.editPhone,
                        startDate: this.state.startDate,
                        editBio: this.state.editBio,
                        isLoading: false
                    });
                } else {
                    this.setState({
                        editError: json.message,
                        isLoading: false,
                    });
                }
            });
    }

    render() {
        console.log("Where is harold? ", this.state)
        return (
            <div className="App">
                <Container fluid>
                    <Row className="signUpRow">
                        <Col xs={12} md={2} lg={4}></Col>
                        <Col xs={12} md={8} lg={4}>
                            <MDBCard>
                                <MDBCardBody>
                                    <form>
                                        <div className="text-center">
                                            <h3 className="dark-grey-text mb-5">
                                                <strong>Edit Profile</strong>
                                            </h3>
                                        </div>
                                        <div className="alert-text">
                                            {
                                                (this.state.editError) ? (
                                                    <p>{this.state.editError}</p>
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
                                                            // onChange={this.upload}
                                                            type="file"
                                                            className="custom-file-input"
                                                            id="inputGroupFile01"
                                                            aria-describedby="inputGroupFileAddon01"
                                                        />
                                                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                            Upload Your Photo
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <MDBInput
                                                label="First Name"
                                                icon="user"
                                                group
                                                type="text"
                                                validate
                                                error="wrong"
                                                success="right"
                                                value={this.state.editName}
                                                onChange={this.onTextboxChangeEditName}
                                            />
                                            <MDBInput
                                                label="Email"
                                                icon="envelope"
                                                group
                                                type="email"
                                                validate
                                                error="wrong"
                                                success="right"
                                                value={this.state.editEmail}
                                                onChange={this.onTextboxChangeEditEmail}
                                            />
                                            <MDBInput
                                                label="Phone"
                                                icon="phone"
                                                group
                                                type="text"
                                                validate
                                                error="wrong"
                                                success="right"
                                                value={this.state.editPhone}
                                                onChange={this.onTextboxChangeEditPhone}
                                            />
                                            <MDBInput
                                                label="Gender"
                                                icon="user"
                                                group
                                                type="text"
                                                validate
                                                error="wrong"
                                                success="right"
                                                value={this.state.editGender}
                                                onChange={this.onTextboxChangeEditGender}
                                            />
                                            <MDBInput
                                                label="Your password"
                                                icon="lock"
                                                group
                                                type="password"
                                                validate
                                                value={this.state.editPassword}
                                                onChange={this.onTextboxChangeEditPassword}
                                            />
                                            <MDBInput
                                                label="Enter Your DOB MM/DD/YYYY"
                                                icon="calendar-alt"
                                                group
                                                type="text"
                                                validate
                                                value={this.state.startDate}
                                                onChange={this.onTextboxChangeEditBirthDate}
                                            />
                                            <MDBInput
                                                label="Your Bio"
                                                icon="align-left"
                                                group
                                                type="textarea"
                                                rows="3"
                                                validate
                                                value={this.state.editBio}
                                                onChange={this.onTextboxChangeEditBio}
                                            />
                                        </div>


                                        <div className="text-center py-4 mt-3">
                                            <MDBBtn onClick={this.onEdit}>
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

export default EditProfile;