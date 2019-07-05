const express = require('express');
const app = express();
const Users = require("../../models/users");
const UserSession = require("../../models/userSession");

// sign up
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


// sign in
  app.post("/accounts/signin", (req, res, next) => {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;

    if (!email) {
      return res.send({
        success: false,
        message: "Error: Please enter a valid email address"
      });
    };
    if (!password) {
      return res.send({
        success: false,
        message: "Error: Please enter your password"
      });
    };

    email = email.toLowerCase();
    
    Users.find({
      email: email
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: server error"
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid"
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: "Error: Invalid"
        });
      }

      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: server error"
          });
        }

        return res.send({
          success: true,
          message: "Valid sign in",
          token: doc._id
        });

      });

    });

  });

module.exports = app;
  