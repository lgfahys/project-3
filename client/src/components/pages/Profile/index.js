import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import { MDBBtn, MDBCard, MDBCardBody } from "mdbreact";
import "./style.css";
import "./media2.css";

import { Row, Col } from "react-bootstrap";
import API from "../../../utils/API";

import profile from '../assets/marie.jpeg';

class Profile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      profiles: "",
      isFlipped: false,
      redirect: false
    };
  }
  
  //Handles set of flip
  handleClick = (event) => {
    event.preventDefault();

    this.setState((prevState) => ({
      isFlipped: !prevState.isFlipped
    }));
  }

  setRedirect = () => {
    this.setState({
        redirect: true
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }
  }

  componentDidMount= () => {
    console.log(`%c➤ Rendering (%s)`, "color: crimson; font-weight: bold;", "Profile", "\n", this.props, "\n", this.state);

    API
      .getProfileByUser(this.props.location.search.substr(1))
      .then(res => {
          console.log("%cGot User Profile", "color: green; font-weight: bold", res.data);
          
          let updatedProfiles = res.data;
          let diff = Date.now() - new Date(res.data.birthdate);
          updatedProfiles.age = new Date(diff).getUTCFullYear() - 1970;
          updatedProfiles.gender = updatedProfiles.gender.charAt(0).toUpperCase() + updatedProfiles.gender.slice(1);
          
          this.setState({ profiles: res.data});
      })
      .catch(err => console.log(err));
  }

  //Render data to frontend
  render() {
    const { profiles } = this.state;
    return (
    <div className="profile-page">
      {this.renderRedirect()}
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        <div className="container front-page" key="front">
          <Row className="signUpRow">
            <Col>
            <button 
                onClick={() => this.setRedirect()}
                className="btn btn-outline-dark btn-back"
            >
            <i className="fas far fa-arrow-left"></i>
            &nbsp;&nbsp;&nbsp;Back
            </button>
              <MDBCard>
                <MDBCardBody >
                  <Row className="userRow">
                    <Col className="profile-row1">
                      <img  className="profile-image" src={profile} alt="profile"/>
                    </Col>
                  </Row>
                  <hr />
                  <div className="grey-text">
                    <p className="h1 text-center py-2">{profiles.name}</p>
                  </div>
                  <hr />
                  <p className="h4 text-center py-3">About Me</p>
                  <div className="grey-text profile-bio">
                    <p>{profiles.bio}</p>
                  </div>
                  <div className="text-center py-2 mt-3">
                    <MDBBtn gradient="blue" type="submit" onClick={this.handleClick}>
                      More Info
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
              </Col>
          </Row>
        </div>

        <div className="container back-page" key="back">
            <Row className="signUpRow">
              <Col>
              <button 
                onClick={() => this.setRedirect()}
                className="btn btn-outline-dark btn-back"
              >
              <i className="fas far fa-arrow-left"></i>
              &nbsp;&nbsp;&nbsp;Back
              </button>
                <MDBCard>
                  <MDBCardBody>
                    <Row className="userRow">
                      <Col className="profile-row1">
                        <img  className="profile-image" src={profiles.link ? profiles.link : profile} alt="profile"/>
                      </Col>
                    </Row>
                    <hr />
                    <div className="grey-text">
                      <p className="h1 text-center py-2">{profiles.name}</p>
                    </div>
                    <hr />
                    <div className="font-weight-bold blue-text">
                      <p className="h5 text-center py-2">{profiles.gender}</p>
                    </div>
                    <hr />
                    <div className="font-weight-bold blue-text">
                      <p className="h5 text-center py-2">{profiles.age}</p>
                    </div>
                    <hr />
                    <div className="text-center py-4 mt-3">
                      <MDBBtn gradient="blue" type="submit" onClick={this.handleClick}>
                        Back To Profile
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </Col>
            </Row>
        </div>
      </ReactCardFlip>
    </div>
    )
  }
};

export default Profile;