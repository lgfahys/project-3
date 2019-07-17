const db = require("../models");

// Defining methods for the {Users}, {UserSession}

module.exports = {
    findAll: function(req, res) {
        db.Users
            .find(req.query, {
                // excluded fields
                "bio": 0 ,
                "birthdate": 0,
                "email": 0,
                "gender": 0,
                "image": 0,
                "password": 0,
                "phone": 0
            })
            .populate({
                path: "acceptedChats",
                select: ["_id", "name", "isActive", "acceptedChats", "ignoredChats", "requestedChats", "pendingChats", "recentLocation"]
            })
            .sort({ name: 1 })
            .then(dbModel => {

                // Room Management Code
                dbModel
                    .filter((user) => user.acceptedChats.length > 0)
                    .filter((user) => {
                        // console.log("AC:", user.acceptedChats[0]);
                        if (user.acceptedChats[0].acceptedChats.indexOf(user._id) !== -1) {
                            const user1 = user._id;
                            const user2 = user.acceptedChats[0]._id;
                            // console.log("Found: User1", user1, "| User2", user2);

                            db.Rooms
                                .find({ $and: [
                                    { users: {$elemMatch: {$in: user1}} },
                                    { users: {$elemMatch: {$in: user2}} } 
                                ] })
                                .populate({
                                    path: "users",
                                    select: ["_id", "name"]
                                })
                                .then(dbModel => {
                                    // console.log(dbModel);
                                    if (dbModel.length < 1) {
                                        // Create room
                                        console.log(`\nUsers staged for new room: ${user1} & ${user2}`);
                                        const newRoom = new db.Rooms();

                                        newRoom.name = newRoom._id;
                                        newRoom.users.push(user1, user2);
                                        
                                        newRoom.save((err, room) => {
                                            if (err) {
                                                console.log("Error creating new room", err);
                                            }
                                            else {
                                                console.log("New room created: \n", room)
                                            }
                                        });
                                    }
                                    else {
                                        console.log("Room exists", dbModel[0].users)
                                    }
                                })
                                .catch(err => console.log(err));
                        }
                        
                        // not really users, but returns users that join each other
                        return user.acceptedChats[0].acceptedChats.indexOf(user._id) !== -1;
                    });
                    
                res.json(dbModel);
            })
            .catch(err => res.status(422).json(err));
    },

    findById: function(req, res) {
        db.Users
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findBySession: function(req, res) {
        db.UserSession
            .findById(req.query.session)
            .populate({
                path: "userId",
                select: ["_id", "name", "isActive", "acceptedChats", "ignoredChats", "requestedChats", "pendingChats", "recentLocation"]
            })
            .then(dbModel => res.json(dbModel.userId))
            .catch(err => res.status(422).json(err));
    },

    findByName: function(req, res) {
        db.Users
            .findOne({ name: { $regex: new RegExp(req.params.name, "ig") }})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    getProfileByUser: function(req, res) {
        db.Users
            .findById(Object.keys(req.query)[0], {
                "acceptedChats": 0,
                "ignoredChats": 0,
                "requestedChats": 0,
                "pendingChats": 0,
                "password": 0,
                "recentLocation": 0,
                "phone": 0,
                "isActive": 0
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    requestUser: function(req, res) {
        db.Users
            .findOneAndUpdate({ _id: req.query.id1 }, {$push: { requestedChats: req.query.id2 }})
            .then(dbModel => {
                db.Users
                .findOneAndUpdate({ _id: req.query.id2 }, {$push: { pendingChats: req.query.id1 }})
                .then(dbModel => { res.json(dbModel) })
                .catch(err => res.status(422).json(err));
            })
            .catch(err => res.status(422).json(err));
    },

    cancelUser: function(req, res) {
        db.Users
            .update({ _id: req.query.id1 }, {$pull: { requestedChats: {$in: [req.query.id2] }}})
            .then(dbModel => {
                db.Users
                .update({ _id: req.query.id2 }, {$pull: { pendingChats: {$in: [req.query.id1] }}})
                .then(dbModel => { res.json(dbModel) })
                .catch(err => res.status(422).json(err));
            })
            .catch(err => res.status(422).json(err));
    },

    activeUser: function(req, res) {
        console.log(req.query);
        db.Users
            .findOneAndUpdate(
                { _id: req.query.id1 },
                {$push: { acceptedChats: req.query.id2 }, $pull: { pendingChats: req.query.id2 }})
                //db.getCollection('users').findOneAndUpdate(
                // {_id: ObjectId("5d1cbf421a804a0b4eb1f387")},
                // { $push: { pendingChats: "5d1cbf421a804a0b4eb1f385" }})
                
            .then(dbModel => {
                console.log("Adding Accepted: ", req.query.id2); 
                db.Users
                .findOneAndUpdate(
                    { _id: req.query.id2 },
                    {$push: { acceptedChats: req.query.id1 },
                    $pull: { requestedChats: req.query.id1 }})
                .then(dbModel => { 
                    console.log("Adding Accepted: ", req.query.id1); 
                    res.json(dbModel);
                })
                .catch(err => res.status(422).json(err));
            })
            .catch(err => res.status(422).json(err));
    },

    deactiveUser: function(req, res) {
        console.log(req.query);
        db.Users
            .findOneAndUpdate(
                { _id: req.query.id1 },
                {$pull: { acceptedChats: req.query.id2 }})
            .then(dbModel => {
                console.log(dbModel); 
                db.Users
                .findOneAndUpdate(
                    { _id: req.query.id2 },
                    { $pull: { acceptedChats: req.query.id1 }})
                .then(dbModel => { res.json(dbModel) })
                .catch(err => res.status(422).json(err));
            })
            .catch(err => res.status(422).json(err));
    },

    updateLocationUser: function(req, res) {
        db.Users
            .findOneAndUpdate({ _id: req.query.id }, { recentLocation: { latitude: req.query.lat, longitude: req.query.lon }})
            .then(dbModel => { res.json(dbModel) })
            .catch(err => res.status(422).json(err));
    },

    // verify the token is unique and its not deleted
    verifyUserToken: function(req, res) {
        db.UserSession.find({
            _id: req.query.token,
            isDeleted: false
        }, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: server error"
                });
            }
    
            if (!sessions.length) {
                return res.send({
                    success: false,
                    message: "Error: Invalid"
                });
            }
            else {
                return res.send({
                    success: true,
                    message: "User is signed in",
                    userId: sessions[0].userId
                });
            }
        });
    },

    // sign up for account
    createUser: function(req, res) {
        const { name, phone, birthdate, gender, password, email } = req.body;

        if (!name) {
            return res.send({
                success: false,
                message: "First name cannot be blank"
            });
        };

        if (!phone) {
            return res.send({
                success: false,
                message: "Please enter your phone number"
            });
        };

        // if (!birthdate) {
        //      return res.send({
        //          success: false,
        //          message: "Error: Please enter your birthdate"
        //      });
        // };

        if (!gender) {
            return res.send({
                success: false,
                message: "Please enter your gender"
            });
        };

        if (!password) {
            return res.send({
                success: false,
                message: "Please enter your password"
            });
        };

        if (!email) {
            return res.send({
                success: false,
                message: "Please enter a valid email address"
            });
        };

        db.Users.find({ email: email.toLowerCase() }, (err, previousUsers) => {
            if (err) {
                return res.send("Error: Server error");
            } 
            else if (previousUsers.length > 0) {
                return res.send("Error: Account already exists")
            }

            const newUser = new db.Users();

            newUser.email = email;
            newUser.name = name;
            newUser.phone = phone;
            newUser.gender = gender;
            // newUser.birthdate = birthdate;
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
    },

    // sign in to account
    signInUser: function(req, res) {
        const { password, email } = req.body;

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
        
        db.Users.findOne({ email: email.toLowerCase() }, (err, users) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: "Error: server error"
                });
            }
    
            if (users === null) {
                return res.send({
                    success: false,
                    message: "Invalid Login"
                });
            }
    
            if (!users.validPassword(password)) {
                return res.send({
                    success: false,
                    message: "Invalid Password"
                });
            }
    
            const userSession = new db.UserSession();
    
            userSession.userId = users._id;
            
            userSession.save((err, doc) => {
                if (err) {
                    console.log(err);
                    return res.send({
                        success: false,
                        message: "Error: server error"
                    });
                }
    
                console.log("Token created: ", doc._id, "\n");
                return res.send({
                    success: true,
                    message: "Signed in!",
                    token: doc._id
                });
            });
        });
    },

    // logout and remove user session
    logoutUser: function(req, res) {
        db.UserSession.findOneAndUpdate({
            _id: req.query.token,
            isDeleted: false
        }, {
            $set: {
                isDeleted: true
            }
        }, null, (err, sessions) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            
            return res.send({
                success: true,
                message: 'Logged out'
            });
        });
    },

    findBySessionEditProfile: function(req, res) {
        db.UserSession
            .findById(req.query.session)
            .populate({
                path: "userId",
                select: ["_id", "name", "email", "phone", "gender", "password", "birthdate", "bio"]
            })
            .then(dbModel => res.json(dbModel.userId))
            .catch(err => res.status(422).json(err));
    },

    // When user edits their profile
    editUser: function(req, res) {
        const { image, name, email, phone, gender, birthdate, bio } = req.body;
        if (!name) {
            return res.send({
                success: false,
                message: "First name cannot be blank"
            });
        };

        if (!email) {
            return res.send({
                success: false,
                message: "Please enter a valid email address"
            });
        };

        if (!phone) {
            return res.send({
                success: false,
                message: "Please enter your phone number"
            });
        };

        if (!gender) {
            return res.send({
                success: false,
                message: "Please enter your gender"
            });
        };
    
        db.Users.findOneAndUpdate(
            {
             _id: req.query.id 
            }, { 
                $set: { 
                    image: image, 
                    name: name, 
                    email: email, 
                    phone: phone, 
                    gender: gender, 
                    birthdate: birthdate, 
                    bio: bio 
                } 
        }, null, (err, ) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            
            return res.send({
                success: true,
                message: 'Profile has been updated'
            });
        });
    },

    // When user edits their password
    editPassword: function(req, res) {
        const { password } = req.body;

        if (!password) {
            return res.send({
                success: false,
                message: "Please enter a password"
            });
        };
    
        db.Users.findOneAndUpdate(
            {
             _id: req.query.id 
            }, { 
                $set: { 
                    password: password
                } 
        }, null, (err, ) => {
            if (err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            
            return res.send({
                success: true,
                message: 'Password has been updated'
            });
        });
    },
    // Clear Everything
    resetDb: function(req, res) {
        const clearDB = async () => {
            const users = db.Users.deleteMany({});
            const sessions = db.UserSession.deleteMany({});
            const rooms = db.Rooms.deleteMany({});
            const messages = db.Messages.deleteMany({});
            
            try {
                const [ usersRes, sessionsRes, roomsRes, messagesRes ] = await Promise.all([users, sessions, rooms, messages]);
                console.log("DB Cleared", usersRes, sessionsRes, roomsRes, messagesRes);

            } catch (error) {
                console.log("Error\n", error);
            }

        };

        clearDB();
    }
}
