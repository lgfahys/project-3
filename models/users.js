const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
    },

    gender: {
        type: String,
        required: true
    },

    birthdate: {
        type: Date,
    },

    image: {
        type: String
    },

    link: {
        type: String
    },

    bio: {
        type: String
    },

    recentLocation: {
        type: Object
    },

    isActive: {
        type: Boolean
    },

    ignoredChats: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],

    ignoredChats: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],

    acceptedChats: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],

    pendingChats: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],

    requestedChats: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }]

});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
