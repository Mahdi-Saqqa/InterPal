const Country = require('../models/country.model');

module.exports = {
    getAll: (req, res) => {
        Country.find()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            });
    },
    getOne: (req, res) => {
        Country.findOne({ _id: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },

}