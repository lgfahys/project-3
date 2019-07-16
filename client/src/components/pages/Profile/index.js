import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';
import { MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
// import { MDBContainer, MDBRow, MDBCol, MDBInput } from 'mdbreact';
import "./style.css";
import "./media2.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import profile from '../assets/marie.jpeg';

import API from "../../../utils/API";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: "",
      isFlipped: false,
      // isLoading: false,
      // error: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  //Handles set of flip
  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }
  //Render data from backend
  componentDidMount() {
    // this.setState({ profiles: data })

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
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        <div key="front">
          <Container fluid>
            <Row className="signUpRow">
              {/* <Col xs={12} md={2} lg={4}></Col> */}
              {/* <Col className="front-page" xs={12} md={8} lg={4}> */}
              <Col className="front-page">
                <MDBCard className="front-body">
                  <MDBCardBody >
                      <div>
                        <Row className="userRow">
                          <Col className="profile-row1">
                            <img  className="profile-image" src={profile} alt="profile"/>
                          </Col>
                        </Row>
                      </div>
                      <hr size="5"></hr>
                      <div className="grey-text">
                        <p className="h1 text-center py-4">{profiles.name}</p>
                      </div>
                      <hr size="5"></hr>
                      <div className="font-weight-bold blue-text">
                        <p className="h6 text-center py-4">{profiles.gender}</p>
                      </div>
                      <hr size="5"></hr>
                      <div className="font-weight-bold blue-text">
                        <p className="h6 text-center py-4">{profiles.age}</p>
                      </div>
                      <hr size="5"></hr>
                      <div className="text-center py-4 mt-3">
                        <MDBBtn gradient="blue" type="submit" onClick={this.handleClick}>
                          More Info
                  </MDBBtn>
                      </div>
                  </MDBCardBody>
                </MDBCard>
                </Col>
              {/* </Col> */}
              {/* <Col xs={12} md={2} lg={4}></Col> */}
            </Row>y
    </Container>
        </div>

        <div key="back">
          <Container fluid>
            <Row className="signUpRow">
              <Col xs={12} md={2} lg={4}></Col>
              <Col xs={12} md={8} lg={4}>
                <MDBCard>
                  <MDBCardBody>
                    <form>
                      <p className="h4 text-center py-4">About Me</p>
                      <div className="grey-text">
                        <p>{profiles.bio}</p>
                      </div>
                      <div className="text-center py-4 mt-3">
                        <MDBBtn gradient="blue" type="submit" onClick={this.handleClick}>
                          Back To Profile
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
      </ReactCardFlip>
    </div>
    )
  }
};

export default Profile;