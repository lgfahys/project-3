const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const routes = require("./routes");




// const webpack = require('webpack');
// const dotenv = require('dotenv');

// This needs to go into the scripts folder as a requred input
// module.exports = () => {
//     // call dotenv and it will return an Object with a parsed key 
//     const env = dotenv.config().parsed;

//     // reduce it to a nice object, the same as before
//     const envKeys = Object.keys(env).reduce((prev, next) => {
//         prev[`process.env.${next}`] = JSON.stringify(env[next]);
//         return prev;
//     }, {});
//     return {
//         plugins: [
//             new webpack.DefinePlugin(envKeys)
//         ]
//     }
// };

// const AWS = require('aws-sdk');
// const fs = require('fs');
// const fileType = require('file-type');
// const bluebird = require('bluebird');
// const multiparty = require('multiparty');

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// console.log(dotenv);
// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/chatterdb";
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});


// Start the API server
const expressServer = app.listen(PORT, () => {
    console.log(`\n🌎 ==> API server now on port ${PORT}!\n`);
});

// Connect Socket
const io = socketio(expressServer, {
    path: "/socket.io", // this is already default options 
    serveClient: true // this is already default options 
});

// Socket Connection
// io.on("connection", (socket, req) => {
//   socket.emit("messageFromServer", {data: "Welcome to the websocket server!!"});

//   // "message" can be called anything
//   //  1st param must match the emit from the client side
//   socket.on("messageToServer", (dataFromClient) => {
//       console.log(dataFromClient);
//   });

//   socket.on("dataToServer", (dataFromClient) => {
//       console.log(dataFromClient);
//   });

//   socket.on("newMessageToServer", (msg) => {
//       console.log(msg);
//       console.log(msg.text);
//       io.emit("messageToClients", {text: msg.text});
//   });
// });


// socket.on('join', function(object) {
    
//     console.log('\u001b[35;1m',object.name,' requested')
//     socket.join(object.chanel);
//     socket.in(object.chanel).emit('message',object.message);


// // io.sockets.in(room.room).emit('message', 'anyone in this room yet?');
// });

io.on("connection", (socket) => {
    console.log(`\x1b[34m  > Socket ID (\x1b[35m${socket.id}\x1b[34m) \x1b[0m- acquired`);
    // console.log(socket.id, socket.rooms)

    socket.on('SEND_MESSAGE', function (data) {        
        // console.log(data.room, socket.id, socket.rooms)
        // console.log(Object.keys( io.sockets.adapter.sids[socket.id] ))
        io.sockets.in(data.room).emit('RECEIVE_MESSAGE', data);
    });

    
    // Maintain user information between all users
    socket.on("sendUpdate", (data) => {
        console.log(`\x1b[34m  > Socket ID (\x1b[35m${socket.id}\x1b[34m) \x1b[0m- sending update request`, data);
        
        let testdata = "NEW USER DATA";
        io.emit("announceUpdate", testdata);
    });

    // Request socket for chat
    socket.on("join", (data) => {
        console.log(`\x1b[34m  > Socket ID (\x1b[35m${socket.id}\x1b[34m) \x1b[0m- joining`, socket.rooms);

        socket.join(data.room);
        socket.in(data.room).emit("message", "Some message here...");
    });

    // Request socket for chat
    socket.on("rejoin", (data) => {
        console.log(`\x1b[34m  > Socket ID (\x1b[35m${socket.id}\x1b[34m) \x1b[0m- rejoining`, data);
        
        socket.join(data.room);
    });

    //
    socket.on("leave", (data) => {
        console.log(`\x1b[34m  > Socket ID (\x1b[35m${socket.id}\x1b[34m) \x1b[0m- leaving`, data);
        
        socket.leave(data.room);
    });

    socket.on("chat", (data) => {
        console.log(`\x1b[34m  > Socket ID (\x1b[35m${socket.id}\x1b[34m) \x1b[0m- chat`, data);
    })

});

