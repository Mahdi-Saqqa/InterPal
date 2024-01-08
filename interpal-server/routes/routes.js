const Country = require('../controllers/country.controller');
const Users = require("../controllers/user.controller");
const {authenticate,authenticateAdmin,authenticateOwner } = require("../config/jwt.config");

module.exports =app => {
    app.get("/api/country", Country.getAll);
    app.post("/api/register", Users.register)
    app.post("/api/login", Users.login)
    app.get("/api/users/loggedin",authenticate, Users.getLoggedInUser)
    app.get("/api/users/logout", Users.logout)



}