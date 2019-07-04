const db = require("../models");

module.exports = {
    
    create: function(req, res) {
        db.Messages
        .create(req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).jso(err));
    }
};