const mongoose = require("mongoose");
const db = require("../models");

// This file empties all collections and inserts the data below

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/chatterdb";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
});

const state = {
    userdb: false,
    userdb_log: true,
    userdb_exit: false,

    roomdb: false,
    roomdb_log: true,
    roomdb_exit: true,

    messagedb: false,
    messagedb_log: true,
    messagedb_exit: true
}

const color = {
    yellow: "\x1b[33m",
    reset: "\x1b[0m"
}

// date: new Date(Date.now())
const userSeed = [
    {
        name: "Elvin",
        email: "elvin@gmail.com",
        birthdate: new Date("<2000-01-15>"),
        password: "password",
        phone: "123-456-7890",
        gender: "male",
        isActive: false,
        image: "me.png",
        bio: "Will be filled out later",
        recentLocation: null,
        ignoredChats: [],
        acceptedChats: [],
        pendingChats: []
    },

    {
        name: "Chase",
        email: "chase@gmail.com",
        birthdate: new Date("<2000-01-15>"),
        password: "password",
        phone: "123-456-7890",
        gender: "male",
        isActive: false,
        image: "me.png",
        bio: "Will be filled out later",
        recentLocation: null,
        ignoredChats: [],
        acceptedChats: [],
        pendingChats: []
    },

    {
        name: "Lindsey",
        email: "lindsey@gmail.com",
        birthdate: new Date("<2000-01-15>"),
        password: "password",
        phone: "123-456-7890",
        gender: "female",
        isActive: false,
        image: "me.png",
        bio: "Will be filled out later",
        recentLocation: null,
        ignoredChats: [],
        acceptedChats: [],
        pendingChats: []
    },

    {
        name: "Jenna",
        email: "jenna@gmail.com",
        birthdate: new Date("<2000-01-15>"),
        password: "password",
        phone: "123-456-7890",
        gender: "female",
        isActive: false,
        image: "me.png",
        bio: "Will be filled out later",
        recentLocation: null,
        ignoredChats: [],
        acceptedChats: [],
        pendingChats: []
    },

    {
        name: "Emery",
        email: "emery@gmail.com",
        birthdate: new Date("<2000-01-15>"),
        password: "password",
        phone: "123-456-7890",
        gender: "female",
        isActive: false,
        image: "me.png",
        bio: "Will be filled out later",
        recentLocation: null,
        ignoredChats: [],
        acceptedChats: [],
        pendingChats: []
    },

    {
        name: "Alyssa",
        email: "alyssa@gmail.com",
        birthdate: new Date("<2000-01-15>"),
        password: "password",
        phone: "123-456-7890",
        gender: "female",
        isActive: false,
        image: "me.png",
        bio: "Will be filled out later",
        recentLocation: null,
        ignoredChats: [],
        acceptedChats: [],
        pendingChats: []
    },

    {
        name: "Andre",
        email: "andrea@gmail.com",
        birthdate: new Date("<2000-01-15>"),
        password: "password",
        phone: "123-456-7890",
        gender: "male",
        isActive: false,
        image: "me.png",
        bio: "Will be filled out later",
        recentLocation: null,
        ignoredChats: [],
        acceptedChats: [],
        pendingChats: []
    },

    {
        name: "Melissa",
        email: "melissa@gmail.com",
        birthdate: new Date("<2000-01-15>"),
        password: "password",
        phone: "123-456-7890",
        gender: "female",
        isActive: false,
        image: "me.png",
        bio: "Will be filled out later",
        recentLocation: null,
        ignoredChats: [],
        acceptedChats: [],
        pendingChats: []
    },

    {
        name: "Kevin",
        email: "kevin@gmail.com",
        birthdate: new Date("<2000-01-15>"),
        password: "password",
        phone: "123-456-7890",
        gender: "male",
        isActive: false,
        image: "me.png",
        bio: "Will be filled out later",
        recentLocation: null,
        ignoredChats: [],
        acceptedChats: [],
        pendingChats: []
    },
];

const populateUsers = async () => {
    if (!state.userdb) return;
    
    let query1 = await db.Users.deleteMany({});
    let query2 = await db.Users.collection.insertMany(userSeed);

    if (state.userdb_log) {
        console.log(color.yellow);
        console.log("Users collection reset, " + query1.n + " records deleted");
        console.log(query2.result.n + " records inserted");
        console.log(color.reset);
    }

    state.userdb_exit ? process.exit(0) : null;
};


const createRoom = async () => {
    if (!state.roomdb) return null;
    let query1, query2; 

    try {
        query1 = await db.Users.findOne({name: "Elvin"});
        query3 = await db.Users.findOne({name: "Lindsey"});
        query2 = await db.Rooms.create({
            name: "room 1",
            users: [ query1._id, query3._id ]
        });
    }
    
    catch(err) {
        console.log(err.errmsg);
    }
    
    finally {
        
        if (state.roomdb_log) {
            console.log(color.yellow);
            console.log("Found user: " + query1.name + " ( " + query1.id + " )");
            
            if (query2 === undefined)
                console.log(0 + " records inserted" );
            else {
                console.log(query2);
                console.log("Room: " + query2.name + "\n >  with: ", query2.users);
                console.log(color.reset);
            }
            
        }
    }

    state.roomdb_exit ? process.exit(0) : null;
};

const addMessage1 = async () => {
    if (!state.messagedb) return null;

    let query1 = await db.Users.findOne({name: "Elvin"});
    let query3 = await db.Users.findOne({name: "Lindsey"});

    // let query2 = await db.Rooms.find({
    //     $and: [
    //         { users: {$elemMatch: {$in: query1._id }} },
    //         { users: {$elemMatch: {$in: query3._id }} }
    //     ]   
    // });

    let query2 = await db.Rooms.find({
            users: {$elemMatch: {$in: query1._id, $in: query3._id } }   
    })
    
    let query4 = await db.Messages.create({
        message: "Hello 5",
        user: query1._id,
        room: query2._id,
    });

    console.log(query4);
    // process.exit(0);

};

const addMessage2 = async () => {
    if (!state.messagedb) return null;

    let query1 = await db.Users.findOne({name: "Lindsey"});
    let query2 = await db.Users.findOne({name: "Elvin"});

    let query3 = await db.Rooms.find({
        users: {$elemMatch: {$in: query1._id, $in: query2._id } }   
    });

    let query4 = await db.Messages.create({
        message: "Hello 6",
        user: query1._id,
        room: query3._id
    });

    console.log(query4);
    // process.exit(0);
};

const addMessage3 = async () => {
    if (!state.messagedb) return null;

    let query1 = await db.Users.findOne({name: "Lindsey"});
    let query2 = await db.Users.findOne({name: "Elvin"});

    let query3 = await db.Rooms.find({
        users: {$elemMatch: {$in: query1._id, $in: query2._id } }   
    });

    let query4 = await db.Messages.create({
        message: "Hello 7",
        user: query1._id,
        room: query3._id
    });

    console.log(query4);
    // process.exit(0);
};

const addMessage4 = async () => {
    if (!state.messagedb) return null;

    let query1 = await db.Users.findOne({name: "Elvin"});
    let query2 = await db.Users.findOne({name: "Lindsey"});

    let query3 = await db.Rooms.find({
        users: {$elemMatch: {$in: query1._id, $in: query2._id } }   
    });

    let query4 = await db.Messages.create({
        message: "Hello 8",
        user: query1._id,
        room: query3._id
    });

    console.log(query4);
    // process.exit(0);
};

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
    }

    return array;
}


const searchMessage = async () => {
    
    let query1 = await db.Users.findOne({name: "Elvin"});
    let query2 = await db.Users.findOne({name: "Lindsey"});

    let query3 = await db.Rooms.find({
        users: {$elemMatch: {$in: query1._id, $in: query2._id } }   
    });

    // 1 is descending, -1 is ascending
    let query4 = await db.Messages.find({
        $query: {
            room: query3._id
        }, 
        $orderby: {
            created : 1
        }
    });

    // console.log(query4);


    for (let i=0; i < query4.length; i++) {
        // console.log(query4[i]._id);

        let user = await db.Users.findOne({ _id: query4[i].user});
        // console.log(user);
        console.log (user.name + ": " + query4[i].message);
    }
}

const runSeed = async () => {
    await populateUsers();
    await createRoom();
    await addMessage1();
    await addMessage2();
    await addMessage3();
    await addMessage4();
    await searchMessage();
    process.exit(0);
}

runSeed();