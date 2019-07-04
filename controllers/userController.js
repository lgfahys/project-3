const db = require("../models");

// Defining methods for the Users

module.exports = {
    findAll: function(req, res) {
        db.Users
            .find(req.query)
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

    findTest: function(req, res) {
        console.log(req.body);
        console.log(req.query);
        console.log(req.params.id);
        db.Users
        .findOne({ name: req.params.id })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    // findById: function(req, res) {
    //     db.Book
    //     .findById(req.params.id)
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // },

    create: function(req, res) {
        db.Users
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    // update: function(req, res) {
    //     db.Book
    //     .findOneAndUpdate({ _id: req.params.id }, req.body)
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // },
    
    // remove: function(req, res) {
    //     db.Book
    //     .findById({ _id: req.params.id })
    //     .then(dbModel => dbModel.remove())
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // }
};
