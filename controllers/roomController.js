const db = require("../models");

module.exports = {
    
    findAll: function(req, res) {
        db.Rooms
            .find(req.query)
            .populate("users")
            .sort({ name: 1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findById: function(req, res) {
        db.Users
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findByName: function(req, res) {
        db.Users
            .findOne({ name: { $regex: new RegExp(req.params.name, "ig") }})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.Messages
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).jso(err));
    }
};