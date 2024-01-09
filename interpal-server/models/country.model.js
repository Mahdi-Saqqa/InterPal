const mongoose = require('mongoose');


const CountrySchema = new mongoose.Schema({

    
    name: { type: String },
    languages: { type: Array },
    flag: { type: String },
    residents: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    code: { type: String },
    
}, { timestamps: true });


const Country = mongoose.model('Country', CountrySchema);

module.exports = Country;