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

// const API = '';
// const DEFAULT_QUERY = 'redux';
const data = {
  'name': 'Marie Johnson',
  'job': 'Web Developer',
  'gender': 'Female',
  'birthdate': 'January 1, 1989',
  'image': 'profile',
  'bio': "Hi my name is Marie! I am new to the area but love to meet new people. My favorite place to socialize is in the downtown area. I can't wait to meet new friends in the city to start chatting with!",
  'link': 'linkedIn.com/marie'
};

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
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
    this.setState({ profiles: data })
    //   this.setState({ isLoading: true });

    //   axios.get(API + DEFAULT_QUERY)
    //     .then(result => this.setState({
    //       profiles: result.data,
    //       isLoading: false
    //     }))
    //     .catch(error => this.setState({
    //       error,
    //       isLoading: false
    //     }));
  }
  //Render data to frontend
  render() {
    const { profiles } = this.state;
    return (
      <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
        <div key="front">
          <Container fluid>
            <Row className="signUpRow">
              <Col xs={12} md={2} lg={4}></Col>
              <Col xs={12} md={8} lg={4}>
                <MDBCard>
                  <MDBCardBody>
                    <form>
                      <div>
                        <Row className="userRow">
                          <Col sm="2" md="2" lg="2">
                            {/* <img className="arrowImg" src="../../../assets/images/left-arrow.png" /> */}
                          </Col>
                          <Col sm="2" md="2" lg="2">

                          </Col>
                          <Col sm="2" md="2" lg="2">
                            <img src={profile} alt="profile"
                              style={{
                                // alignSelf: 'center',
                                height: 150,
                                width: 150,
                                borderWidth: 1,
                                borderRadius: 75,
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}
                              resizeMode="stretch"
                            />
                          </Col>
                          <Col sm="2" md="2" lg="2">

                          </Col>
                          <Col sm="3" md="3" lg="3">
                            {/* <button class="btn btn-danger">Primary<i class="fas  pl-1"></i></button> */}
                          </Col>
                        </Row>
                      </div>
                      <hr size="10"></hr>
                      <div className="grey-text">
                        <p className="h1 text-center py-4">{profiles.name}</p>
                      </div>
                      <hr size="10"></hr>
                      <div className="font-weight-bold blue-text">
                        <p className="h5 text-center py-4">{profiles.job}</p>
                      </div>
                      <hr size="10"></hr>
                      <div className="font-weight-bold blue-text">
                        <p className="h6 text-center py-4">{profiles.gender}</p>
                      </div>
                      <hr size="10"></hr>
                      <div className="font-weight-bold blue-text">
                        <p className="h6 text-center py-4">{profiles.birthdate}</p>
                      </div>
                      <hr size="10"></hr>
                      <div className="font-weight-bold blue-text">
                        <p className="h6 text-center py-4">{profiles.link}</p>
                      </div>
                      {/* <hr size="10"></hr>
                      <div className= "font-weight-bold blue-text">
                      <p className="h4 text-center py-4">{profiles.gender}</p>
                      </div> */}
                      {/* <hr size="10"></hr>
                      <div className="grey-text">
                    
                      </div> */}
                      <hr size="10"></hr>
                      <div className="text-center py-4 mt-3">
                        <MDBBtn gradient="blue" type="submit" onClick={this.handleClick}>
                          More Info
                  </MDBBtn>
                      </div>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </Col>
              <Col xs={12} md={2} lg={4}></Col>
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
    )
  }
};

// Profile.propTypes = {
//   styles: PropTypes.object
// };

export default Profile;