const mongoose = require("mongoose");

const userSessionSchema = new mongoose.Schema({
    userId: {
        type: Number,
        default: -1
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isSignedIn: {
        type: Boolean,
        default: false
    }
});

const UserSession = mongoose.model("UserSession", userSessionSchema);

module.exports = UserSession;