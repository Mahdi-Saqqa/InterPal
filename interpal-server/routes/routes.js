const Country = require('../controllers/country.controller');
const Users = require("../controllers/user.controller");
const {authenticate , authenticateAdmin} = require("../config/jwt.config");
const multer = require("../config/multer.config");
const Chat = require("../controllers/chat.controller");
module.exports =app => {
    app.get("/api/country", Country.getAll);
    app.post("/api/register", Users.register)
    app.post("/api/login", Users.login)
    app.post("/api/users/loggedin",authenticate, Users.getLoggedInUser)
    app.post("/api/users/activate",authenticate, Users.activateUser)
    app.post("/api/users/resend",authenticate, Users.sendActivationEmail)
    app.post('/api/users/completeprofile',multer.uploadFile.single('profilePicture'), Users.completeUser)
    app.get("/api/users", Users.getAll)
    app.post('/api/chat/new', Chat.newChat)
    app.post('/api/chat/userChat', Chat.getUserChat)
    app.post('/api/chat/getChat', Chat.getChat)



}