const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "Users"
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

const UserSession = mongoose.model("User Session", userSessionSchema);

module.exports = UserSession;
