const express = require("express");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const routes = require("./routes");
const AWS = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const bluebird = require('bluebird');
const multiparty = require('multiparty');

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

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/chatterdb";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false
});


// Start the API server
const expressServer = app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
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