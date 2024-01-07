const express = require('express');
const app = express();
const cors = require('cors');
require('./config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require('./routes/country.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})