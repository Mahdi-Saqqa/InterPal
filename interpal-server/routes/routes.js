const Country = require('../controllers/country.controller');
const Users = require("../controllers/user.controller");
const {authenticate , authenticateAdmin} = require("../config/jwt.config");
const multer = require("../config/multer.config");
const Chat = require("../controllers/chat.controller");
module.exports =app => {



    //user routes
    app.post("/api/user/register",Users.validateUser, Users.register)
    app.post("/api/user/login", Users.login)
    app.post("/api/user/activate",authenticate, Users.activateUser)
    app.get("/api/user/resend",authenticate, Users.sendActivationEmail)
    app.post('/api/user/uploadProfilePicture',authenticate,multer.uploadFile.single('profilePicture'), Users.uploadProfilePicture)
    app.post('/api/user/completeProfile',authenticate, Users.completeUser)





    app.get("/api/country", Country.getAll);
    app.post("/api/country", Country.create);

    app.get("/api/users/loggedin",authenticate, Users.getLoggedInUser)
    app.post('/api/users/getuser/:id',  Users.getUser)
    // app.post('/api/users/editprofile',multer.uploadFile.single('profilePicture'), Users.editUser)
    app.get("/api/users", Users.getAll)
    app.post('/api/chat/new',authenticate, Chat.newChat)
    app.get('/api/chat/userChat',authenticate, Chat.getUserChat)
    app.post('/api/chat/getChat',authenticate, Chat.getChat)
    app.get('/api/language', Country.getLanguages)



    //for development only
    app.post('/api/language',authenticate, Country.addLanguage)



}