const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const routes = require("./routes");

const webpack = require('webpack');
const dotenv = require('dotenv');

// This needs to go into the scripts folder as a requred input
module.exports = () => {
  // call dotenv and it will return an Object with a parsed key 
  const env = dotenv.config().parsed;
  
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    plugins: [
      new webpack.DefinePlugin(envKeys)
    ]
  }
};

// const AWS = require('aws-sdk');
// const fs = require('fs');
// const fileType = require('file-type');
// const bluebird = require('bluebird');
// const multiparty = require('multiparty');

const PORT = process.env.PORT || 3001;
const app = express();

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

console.log(dotenv);
// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/chatterdb";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
});


// Start the API server
const expressServer = app.listen(PORT, () => {
  console.log(`\n🌎 ==> API server now on port ${PORT}!`);
});

// Connect Socket
const io = socketio(expressServer, {
  // path: "/socket.io",  // this is already default options 
  // serveClient: true    // this is already default options 
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

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('SEND_MESSAGE', function(data){
      io.emit('RECEIVE_MESSAGE', data);
  })
});