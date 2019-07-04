import React from "react";
import "../style.css";
import Col from 'react-bootstrap/Col'


function User(){
        return (
            
            <Col sm="2" md="2" lg="2" className='userImgCol'>
                <img className="user" alt="user-icon" src="../../../assets/images/user.png " />
                <h4>Name</h4>
            </Col>
            
        )
}
    
export default User;