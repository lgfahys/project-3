import React, { Component } from "react";

import "./style.css";
import "./media2.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'


class SignUp extends Component {
    render() {
      return (
        <div className ="App">
        <Nav variant="pills" defaultActiveKey="/home">
                <Nav.Item>
                    <Image className="navImage" src="../../../assets/images/mail.png"/>
                </Nav.Item>
                <Nav.Item className="firstNavItem">
                    <Nav.Link eventKey="link-1">LOGIN</Nav.Link>
                </Nav.Item>
                <Nav.Item className="secondNavItem">
                    <Nav.Link eventKey="link-2">SIGN UP</Nav.Link>
                </Nav.Item>
            </Nav>
            <Container>
              <Row className="cardRow">
                <Col sm={5} md={9} lg={9} mx-auto className="cardColmn">
                  <Card className="card-signin my-S">
                    <Card.Body>
                      <h5 className="card-title text-center">Sign In</h5>
                      <form class="form-signin">
                      <div class="form-label-group">
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus/>
                <label for="inputEmail">Email address</label>
              </div>
              <div class="form-label-group">
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" required/>
                <label for="inputPassword">Password</label>
              </div>
              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1"/>
                <label class="custom-control-label" for="customCheck1">Remember password</label>
              </div>
              <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
              <hr class="my-4"/>
              <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i class="fab fa-google mr-2"></i> Sign in with Google</button>
              <button class="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i class="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
            </form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

            </Container>
            </div>
      )
    }
}

export default SignUp;