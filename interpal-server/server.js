const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('./config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require('./routes/routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})