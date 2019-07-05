const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
    userId: {
        type: String,
        default: ""
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isSignedOn: {
        type: Boolean,
        default: false
    }
});

const UserSession = mongoose.model("User Session", userSessionSchema);

module.exports = UserSession;
