const Country = require('../models/country.model');
const Language = require('../models/language.model');
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
    addLanguage: (req, res) => {
        Language.findOne({ symbol: req.body.symbol })
            .then(data => {
                if (data) {
                    console.log('dublicated country' );
                    console.log(data);
                    Country.findOneAndUpdate({ _id: req.params.id }, { $push: { languages: data } }, { runValidators: true, new: true })
                        .then(data => res.json(data))
                        .catch(err => res.json(err));
                }
                else {
                    console.log('new country' );
                    console.log(req.body);
                    const language = new Language(req.body);
                    language.save()
                        .then(data => {
                            Country.findOneAndUpdate({ _id: req.params.id }, { $push: { languages: data } }, { runValidators: true, new: true })
                                .then(data => res.json(data))
                                .catch(err => res.json(err));
                        })
                        .catch(err => res.json(err));
                }
            })
            .catch(err => res.json(err));
    },
    getLanguages: (req, res) => {
        Language.find()
            .then(data => res.json(data))
            .catch(err => res.json(err));
    },
}