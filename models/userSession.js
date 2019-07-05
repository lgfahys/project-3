const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
    userId: {
        type: Number,
        default: -1
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

module.exports = mongoose.model('userSession', userSessionSchema)