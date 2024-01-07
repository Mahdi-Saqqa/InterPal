const Country = require('../controllers/country.controller');
module.exports =app => {


    app.post("/api/country", Country.create);
    app.get("/api/country", Country.getAll);


}