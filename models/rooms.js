const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name: {
        type: String,
        required: false,
        unique: true
    },

    users: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }]

});

const Rooms = mongoose.model("Rooms", roomSchema);

module.exports = Rooms;
