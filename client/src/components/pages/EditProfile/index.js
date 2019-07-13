import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import FileUpload from "./FileUpload";
import "./media.css";
import "./style.css";

function EditProfile(){
    return(
        <Container>
            <Row>
                <FileUpload />
            </Row>
        </Container>
    )
}
export default EditProfile;