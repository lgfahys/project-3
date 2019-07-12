const mongoose = require("mongoose");
const db = require("../models");

const seedUsers = require("./usersArray");

// Connect to the MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/chatterdb";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});


// db.Users
//   .remove({})
//   .then(() => db.Applicant.collection.insertMany(seedUsers))
//   .then(data => {
//     console.log(data.result.n + " records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

let userCount = 0;
let sessionCount = null;


const clearUsers = async () => {
    await db.Users
        .deleteMany({}).exec()
        .then((data) => {
            console.log(`\nClearing database: ${data.n} records removed...\n`);
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}

const clearSessions = async () => {
    await db.UserSession
        .deleteMany({})
        .then((data) => {
            console.log(`\nClearing sessions: ${data.n} sessions removed...\n`);
            sessionCount = data.n || 1;
        })
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}


clearUsers(); 
clearSessions();


seedUsers.map((user) => {
    let newUser = new db.Users();

    // general data
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = newUser.generateHash(user.password);

    // profile data
    newUser.phone = user.phone;
    newUser.gender = user.gender;
    newUser.birthdate = user.birthdate;
    newUser.bio = user.bio;
    newUser.image = user.image;

    // chat data
    newUser.isActive = user.isActive;
    newUser.recentLocation = user.recentLocation;
    newUser.acceptedChats = user.acceptedChats;
    newUser.ignoredChats = user.ignoredChats;
    newUser.pendingChats = user.pendingChats;
    newUser.requestedChats = user.requestedChats;

    // create user
    newUser.save((err, user) => {
        if (err) return console.error(err);
        
        userCount += 1;
        
        console.log(`[${user._id}] #${userCount} - ${user.name} saved to user collection.`);

    });
});

setTimeout(() => {
    if (userCount === seedUsers.length && sessionCount !== null) {
        console.log(`\nAll users inserted into database...\n`);
        process.exit(0);
    }
}, 1000);

