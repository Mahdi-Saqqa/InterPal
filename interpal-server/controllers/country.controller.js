const Country = require('../models/country.model');

module.exports = {
    create: (req, res) => {
        console.log(req.body);
        Country.create(req.body)
            .then(data => {
                console.log("create method executed");
                res.json(data)
            })
            .catch(err => {
                console.log("create method failed");
                console.log(err);
                res.json(err)
            });
    },
    getAll: (req, res) => {
        Country.find()
            .then(data => {
                console.log("getAll method executed");
                res.json(data)
            })
            .catch(err => {
                console.log("getAll method failed");
                res.json(err)
            });
    },
    getOne: (req, res) => {
        Country.findOne({ _id: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },

}