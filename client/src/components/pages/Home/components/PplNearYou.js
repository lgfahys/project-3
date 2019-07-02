import React from "react";
import "../style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function PplNearYou (){
    return(
        <Row className='userRow'>
            <Col sm="1" md="1" lg="1"><img className="user" alt="user-icon" src="../../../assets/images/user.png "/> </Col>
            <Col className='col' sm="2" md="2" lg="2">Name</Col>
            <Col sm="3" md="3" lg="3"><button className="btn btn-outline-default">Primary<i className="fas far fa-plus-square pl-1"></i></button></Col>
            <Col sm="3" md="3" lg="3"><button className="btn btn-default">Primary<i className="fas fas fa-user pl-1"></i></button></Col>
        </Row>   
    )
}

export default PplNearYou;
