const db = require("../models");

module.exports = {
    
    findAll: function(req, res) {
        db.Rooms
            .find(req.query)
            .populate({
                path: "users",
                select: ["_id", "name", "isActive", "acceptedChats", "ignoredChats", "requestedChats", "pendingChats", "recentLocation"]
            })
            // .sort({ name: 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findById: function(req, res) {
        db.Rooms
            .findById(req.params.id)
            .populate("users")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findByName: function(req, res) {
        db.Rooms
            .findOne({ name: { $regex: new RegExp(req.params.name, "ig") }})
            .populate("users")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findByUser: function(req, res) {
        db.Rooms
            .find({users: {$elemMatch: {$in: req.params.id} } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findByUsers: function(req, res) {
        db.Rooms
            .find({users: {$elemMatch: {$in: req.query.id1, $in: req.query.id2} } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    remove: function(req, res) {
        db.Rooms
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};