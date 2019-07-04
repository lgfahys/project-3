const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: {
        type: String,
        required: true
    },
    
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },

    room: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Rooms"
    },

    created: {
        type: Date,
        default: Date.now()
    }

});

const Messages = mongoose.model("Messages", messageSchema);

module.exports = Messages;
