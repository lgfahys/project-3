const express = require('express');
const app = express();
const Users = require("../../models/users");

  app.post("/accounts/signup", (req, res, next) => {
    const { body } = req;
    const {
      name,
      phone,
      birthdate,
      gender,
      password
    } = body;
    let {
      email
    } = body;
    
    if (!name) {
      return res.send({
        success: false,
        message: "Error: First name cannot be blank"
      });
    };
    if (!phone) {
      return res.send({
        success: false,
        message: "Error: Please enter your phone number"
      });
    };
    if (!birthdate) {
      return res.send({
        success: false,
        message: "Error: Please enter your birthdate"
      });
    };
    if (!gender) {
      return res.send({
        success: false,
        message: "Error: Please enter your gender"
      });
    };
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Please enter your password"
      });
    };
    if (!email) {
      return res.send({
        success: false,
        message: "Error: Please enter a valid email address"
      });
    };

    email = email.toLowerCase();

    Users.find({
      email: email
    }, (err, previousUsers) => {
          if (err) {
          return res.send("Error: Server error");
        } else if (previousUsers.length > 0) {
          return res.send("Error: Account already exists")
        }

        const newUser = new Users();

        newUser.email = email;
        newUser.name = name;
        newUser.phone = phone;
        newUser.gender = gender;
        newUser.birthdate = birthdate;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: server error"
            });
          }
          return res.send({
            success: true,
            message: "Signed up!"
          });
        });
     });
  });

module.exports = app;
  