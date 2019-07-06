import React from "react";
import "../style.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function PChatReq (){
    return(
        <Row className="userSecondRow">
            <Col sm="1" md="1" lg="1"><img className="user" alt="user-icon" src="../../../assets/images/user.png"/> </Col>
            <Col className='col' sm="2" md="2" lg="2">Name</Col>
            <Col sm="2" md="2" lg="2"><button className="btn btn-outline-default">Accept<i className="fas far fa-plus-square pl-1"></i></button></Col>
            <Col  sm="2" md="2" lg="2"><button className="btn btn-danger">Decline<i className="fas far fa-thumbs-down pl-1"></i></button></Col>
            <Col sm="2" md="2" lg="2"><button className="btn btn-default">Profile<i className="fas fas fa-user pl-1"></i></button></Col>
        </Row>
    )
}
export default PChatReq;