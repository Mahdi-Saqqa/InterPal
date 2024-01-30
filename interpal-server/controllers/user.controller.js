const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {secret} = require("../config/jwt.config");
const Country = require("../models/country.model");



//function to generate random 6 digits number for activation code
function generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
}



class UserController {

    register(req, res) {
        User.findOne({ Email: req.body.Email.toLowerCase() })
            .then(existingUser => {
                if (existingUser) {
                    res.status(401).json({ msg: "Email already exists" });
                } else {
                    const user = new User({
                        ...req.body,
                        Password: bcrypt.hashSync(req.body.Password, 10),
                        Email: req.body.Email.toLowerCase(),
                        activationToken: generateRandomNumber()
                    });
    
                    user.save()
                        .then(() => {
                            return Country.findOne({ _id: req.body.country });
                        })
                        .then(country => { 
                            if (!country.residents) {
                                country.residents = [];
                            }
                            country.residents.push(user._id);    
                            return country.updateOne({ residents: country.residents });
                        })
                        .then(() => {
                            res.json({ msg: "Success!", 
                            id: user._id,
                            firstName: user.Fname,
                            lastName: user.Lname,
                            Email: user.Email,
                            activationToken: user.activationToken,
                            token: jwt.sign({id: user._id,role:user.role}, secret),
                        }).status(201);
                        })
                        .catch(err => {
                            console.error("Error sending email", err);
                            res.status(400).json(err);
                        });
                }
            })
            .catch(err => res.status(400).json(err));
    }
    

    login(req, res){
        console.log(req.body);
        User.findOne({Email: req.body.Email})
            .then(user=>{                
                if(user === null){
                    res.status(401).json({msg: "invalid login attempt-user not found"})
                } else{
                    bcrypt.compare(req.body.Password, user.Password)
                        .then(passwordIsValid=>{
                            if(passwordIsValid){
                                console.log("password is valid");
                                res.status(200).json({
                                    msg: "success!",
                                    token: jwt.sign({id: user._id,role:user.role}, secret),
                                });
                            }else{
                                res.status(401).json({msg: "invalid login attempt- password incorrect"})
                            }
                        })
                        .catch(err=> {
                            res.status(400).json({msg: "invalid login attempt", err})
                        } )
                }
            })
            .catch(err=> res.status(400).json(err))
    }

    getLoggedInUser(req,res){
        let id = jwt.decode(req.body.token).id;
        User.findById(id).populate("country").select("-Password")
            .then(user=> {
                res.json({user})
            })
            .catch(err=> {
                res.status(400).json(err)
            })

    }
    activateUser(req, res) {
        let code = req.body.code;
        let id = req.body.id;
        User.findOne({ _id: id })
            .then(user => {
                if (user.activationToken == code) {
                    user.updateOne({
                        activationToken: null,
                        activated: true
                    })
                        .then(() => res.json({ msg: "Success!" }))
                        .catch(err => res.status(400).json(err));
                } else {
                    res.status(401).json({ msg: "Invalid activation code" });
                }
            })
            .catch(err => res.status(400).json(err));
    }
    sendActivationEmail(req, res) {
        console.log(req.body);
        let id = req.body.id;

        User.findOne({ _id: id })
            .then(user => {
                    user.activationToken = generateRandomNumber();
                    user.save()
                        .then(() => {
                            res.json({
                                id: user._id,
                                Email: user.Email,
                                activationToken: user.activationToken,
                                Fname: user.Fname,
                                Lname: user.Lname,

                            });
                        }   )
                        .catch(err => {
                            res.status(400).json(err)
                        });
            })
            .catch(err => res.status(400).json(err));
    }
    completeUser(req, res) {
        console.log(req.body);
        console.log(req.file);
        User.findOne({ _id: req.body.userId })
            .then(user => {
                user.updateOne({
                    profilePic: {
                        name: req.file.filename,
                        details: req.file
                    },
                    bio: req.body.bio,
                    completed : true,
                    

                })
                    .then(() => res.json({ msg: "Success!" }))
                    .catch(err => res.status(401).json(err));
            })
            .catch(err => res.status(400).json(err));
    }
    getAll(req, res) {
        User.find().populate("country").select("-Password")
            .then(users => {
                res.json({ users });
            })
            .catch(err => res.status(400).json(err));
    }
    getUser(req, res) {
        console.log(req.params.id);
        User.findOne({ _id: req.params.id }).populate("country").select("-Password")
            .then(user => {
                res.json({ user });
            })
            .catch(err => res.status(400).json(err));
    }
}
module.exports = new UserController();