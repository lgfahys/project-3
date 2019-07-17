const db = require("../models");

module.exports = {

    findAll: function(req, res) {
        db.Messages
            .find(req.query)
            // .populate("users")
            .sort({ name: 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    
    findByUserId: function(req, res) {
        console.log(req.params.id)
        db.Messages
            .find({user: {$in: req.params.id} })
            // .populate("user")
            // .populate("room")
            .sort({ name: 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findByRoomId: function(req, res) {
        console.log(req.params.id)
        db.Messages
            .find({room: {$in: req.params.id} })
            .populate({ 
                path: "user", 
                select: ["name", "_id"]
            })
            .populate({
                path: "room",
                select: ["name", "_id"]
            })
            .sort({ created: 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
};