const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {secret} = require("../config/jwt.config");
const Country = require("../models/country.model");

function generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
    .random() * (maxm - minm + 1)) + minm;
}
function generateToken(id) {
    const userToken = jwt.sign(id, secret);
    return userToken;
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
                        Email: req.body.Email.toLowerCase(),
                        activationToken: generateRandomNumber()
                    });
    
                    user.save()
                        .then(() => {
                            console.log("user created");
                            return Country.findOne({ _id: req.body.country });
                        })
                        .then(country => {
                            console.log("country found");
                            console.log(country);
    
                            if (!country.residents) {
                                country.residents = [];
                            }
    
                            console.log(country);
                            country.residents.push(user._id);
                            console.log(country);
    
                            return country.updateOne({ residents: country.residents });
                        })
                        .then(() => {
                            console.log("country saved");
                            res.json({ msg: "Success!", user: user }).status(201);
                        })

                        .catch(err => {
                            console.error("Error sending email", err);
                            res.status(400).json({
                                msg: "Error saving user or sending email",
                                err: err
                            });
                        });
                }
            })
            .catch(err => res.status(400).json(err));
    }
    

    login(req, res){
        User.findOne({Email: req.body.Email})
            .then(user=>{                
                if(user === null){
                    res.status(401).json({msg: "invalid login attempt-user not found"})
                } else{
                    bcrypt.compare(req.body.Password, user.Password)
                        .then(passwordIsValid=>{
                            if(passwordIsValid){
                                res.status(200).json({
                                    msg: "success!",
                                    id: user._id,
                                    firstName: user.Fname,
                                    lastName: user.Lname,
                                    Email: user.Email,
                                    token: generateToken({id: user._id})
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
        console.log(req.body);
        let code = req.body.code;
        let id = req.body.id;
        User.findOne({ _id: id })
            .then(user => {
                if (user.activationToken == code) {
                    user.activationToken = null;
                    user.activated = true;
                    user.save()
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
                    console.log(user);
                    user.save()
                        .then(() => {
                            console.log("user saved");
                            console.log(user);
                            res.json({
                                id: user._id,
                                Email: user.Email,
                                activationToken: user.activationToken,
                                Fname: user.Fname,
                                Lname: user.Lname,

                            });
                        }   )
                        .catch(err => {
                            console.log(err);
                            console.log("user not saved");
                            res.status(400).json(err)
                        });
            })
            .catch(err => res.status(400).json(err));
    }
}
module.exports = new UserController();