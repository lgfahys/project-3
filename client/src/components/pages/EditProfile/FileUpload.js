import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./media.css";
import "./style.css";

import NavLI from "../../Navbar/loggedIn";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Geo, { inRadius } from "../../Geo";
import API from "../../../utils/API";
import ReactS3 from 'react-s3';
import S3FileUpload from 'react-s3';
 
//Optional Import
import { uploadFile } from 'react-s3';
//import { Component } from 'react';
 
const config = {
    bucketName: 'chatterbucket',
    dirName: 'photos', /* optional */
    region: 'us-east-1',
    accessKeyId: 'AKIAIJ6W3DDP3IBZDAQA',
    secretAccessKey: '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',
}



class FileUpload extends Component {
constructor(){
  super();
}
upload(e){
  console.log(e.target.files[0]);
  S3FileUpload.uploadFile(e.target.files[0], config)
  .then((data)=>{
  console.log(data)
  console.log(data.location)
  })
  .catch((err)=>{
    alert(err);
  })
}
render(){
  return(
    <div>
      <h3>aws s3 upload</h3>
      <input type="file"
      onChange={this.upload}
      />
    </div>
  )
}


}

export default FileUpload;