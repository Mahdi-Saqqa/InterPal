const mongoose = require('mongoose');

const languageSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Language = mongoose.model('Language', languageSchema);

module.exports = Language;
