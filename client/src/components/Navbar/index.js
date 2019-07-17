import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink } from "mdbreact";
import { getFromStorage, setInStorage } from "../../utils/storage";
import socketIOClient from "socket.io-client";
import "./style.css";

// defined as a global var for different pages / components
var socket;

class Navbar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            endpoint: "", // or user ":3001"
            path: null,
            redirect: false
        };

        socket = socketIOClient();
        this.onClick = this.onClick.bind(this);
    }

    onClick = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    renderRedirect = () => {
        if (this.state.redirect && this.state.path) {
            return <Redirect to={this.state.path} token={''}/>
        }        
    }


    logout () {
        this.setState({ isLoading: true });
        
        console.log("Token removed...")
        const obj = getFromStorage('the_main_app');
        if (obj && obj.token) {
        const { token } = obj;
        
        // Verify token
        fetch('/api/accounts/logout?token=' + token)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                setInStorage('the_main_app', '');
                this.setState({
                    token: '',
                    isLoading: false,
                    redirect: true,
                    path: '/'
                });              
                this.renderRedirect();
            }
            else {
                this.setState({ isLoading: false });
            }
        });
        }
        else {
            this.setState({ isLoading: false });
        }
    }

    logout = this.logout.bind(this);

    renderLoggedIn = () => {
        const blueText = {color: '#66FCF1'}
        return (
        <div>
            {this.renderRedirect()}
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
                                <MDBNavLink style={blueText} onClick={ this.logout } to="/">Log Out</MDBNavLink>
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </header>
        </div>
        )
    }

    renderLoggedOut = () => {
        const blueText = {color: '#66FCF1'}
        return (
        <div>
            <header>
                <MDBNavbar expand="md" scrolling fixed="top">
                    <MDBNavbarBrand style={blueText} href="/">
                        <strong>Chatter</strong>
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.onClick} />
                    <MDBCollapse isOpen={this.state.collapse} navbar>
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
        )
    }

    render() {
        // console.log("Nav bar rendering");
        // console.log(this.props);

        // If we have not received a token from the user (they have not successfully logged in)
        if (!this.props.token) {
            console.log("No token... render NavLO");
            return this.renderLoggedOut();
        
        // If we have received a token from the user (they have successfully logged in)
        } else if (this.props.token) {
            console.log("Received the token!!! Render the logged in Nav");
            return this.renderLoggedIn();
        }
    }
}

export { Navbar, socket };
