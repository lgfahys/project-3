import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink } from 'mdbreact';
import "../style.css";

class NavLO extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
      };
      this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
        collapse: !this.state.collapse,
      });
  }

  render() {
    const blueText = {color: '#66FCF1'}
    return(
      <div>
          <header>
            <MDBNavbar expand="md" scrolling fixed="top">
              <MDBNavbarBrand style={blueText} href="/">
                  <strong>Chatter</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={ this.onClick } />
              <MDBCollapse isOpen = { this.state.collapse } navbar>
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBNavLink style={blueText} to="/login">Login</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink style={blueText} to="/signup">Signup</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
      </div>
    );
  }
}

export default NavLO;