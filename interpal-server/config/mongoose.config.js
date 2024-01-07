const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb+srv://mahdisaqqa:6dbBkDF9S25iUeq5@cluster0.xzdysub.mongodb.net/interpal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));
