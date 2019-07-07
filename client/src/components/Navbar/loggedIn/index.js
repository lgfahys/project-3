import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink } from 'mdbreact';
import "../style.css";
import { Redirect } from 'react-router-dom';
import {
  getFromStorage
} from "../../../utils/storage";

class NavLI extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
          redirect: false
      };
      this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
        collapse: !this.state.collapse,
      });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    console.log("Token removed...")
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/accounts/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false,
              redirect: true
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  logout = this.logout.bind(this);
  render() {
    const blueText = {color: '#66FCF1'}
    return(
      <div>
          <header>
            <MDBNavbar className="navbar" expand="md" scrolling fixed="top">
              <MDBNavbarBrand style={blueText} href="/home">
                  <strong>Chatter</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={ this.onClick } />
              <MDBCollapse isOpen = { this.state.collapse } navbar>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBNavLink style={blueText} to="/editProfile">Edit Profile</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                  {this.renderRedirect()}
                    <MDBNavLink style={blueText} onClick={this.logout} to="/">Log Out</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
      </div>
    );
  }
}

export default NavLI;