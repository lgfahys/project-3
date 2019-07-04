import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import "./style.css";
import "./media2.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
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
                      <p className="h4 text-center py-4">Marie Johnson</p>
                      <div className="grey-text">
                        <MDBInput
                          label="First Name"
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <MDBInput
                          label="Email"
                          icon="envelope"
                          group
                          type="email"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <MDBInput
                          label="Phone"
                          icon="phone"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <MDBInput
                          label="Gender"
                          icon="user"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                        />
                        <MDBInput
                          label="Your password"
                          icon="lock"
                          group
                          type="password"
                          validate
                        />
                        <MDBInput
                          label="Confirm Password"
                          icon="exclamation-triangle"
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                        />
                      </div>
                      <div className="text-center py-4 mt-3">
                        <MDBBtn gradient="blue" type="submit" onClick={this.handleClick}>
                          Flip
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
                      <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Maxime quae, dolores dicta. Blanditiis rem amet repellat,
                  dolores nihil quae in mollitia asperiores ut rerum
                  repellendus, voluptatum eum, officia laudantium quaerat?
                </p>
                      </div>
                      <div className="text-center py-4 mt-3">
                        <MDBBtn gradient="blue" type="submit" onClick={this.handleClick}>
                          Flip Back
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