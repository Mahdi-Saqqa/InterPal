const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwt.config");
const Country = require("../models/country.model");
const { generateRandomNumber, isOver18 } = require("../utitlies");



class UserController {
  constructor() {
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.getLoggedInUser = this.getLoggedInUser.bind(this);
    this.activateUser = this.activateUser.bind(this);
    this.sendActivationEmail = this.sendActivationEmail.bind(this);
    this.completeUser = this.completeUser.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getUser = this.getUser.bind(this);
    this.validateUser = this.validateUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }
  // @desc Validate user input
  // @Middleware route POST /api/user/register
  async validateUser(req, res, next) {
    let errors = {}
    try {
      const user = await User.findOne({ email: req.body.email.toLowerCase() })
      if (user) {
        errors={...errors , email: "Email already exists"};
      }
      const {firstName, lastName, email, password,confirmPassword, country, birthDay} = req.body;
      if (!firstName || !lastName || !email || !password || !confirmPassword || !country || !birthDay) {
        errors.push({msg: "Please enter all fields"});
      }
      if (!/^[a-zA-Z]+$/.test(firstName)) {
        errors = {...errors , firstName: "First Name must contain only letters"};
      }
      if (!/^[a-zA-Z]+$/.test(lastName)) {
        errors = {...errors , lastName: "Last Name must contain only letters"};
      }
      if (password.length < 8) {
        errors = {...errors , password: "Password must be 8 characters or longer"};
      }
      if(password !== confirmPassword){
        errors = {...errors , confirmPassword: "Passwords do not match"};
      }
      if (isOver18(birthDay) === false){
        errors = {...errors , birthDay: "Age must be over 18"};
      }
      if (Object.keys(errors).length>0) {
        return res.status(401).json(errors);
      }
      next();
  }
  catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
  }
  // @desc Register new user
  // seperate function for readability

  async registerUser(newUser) {
    const user = new User({
      ...newUser,
      password: bcrypt.hashSync(newUser.password, 10),
      email: newUser.email.toLowerCase(),
      activationToken: generateRandomNumber(),
    });
    try {
      await user.save();  
      const country = await Country.findOne({ _id: newUser.country });
      if (!country.residents) {
        country.residents = [];
      }
      country.residents.push(user._id);
      await country.updateOne({ residents: country.residents });
  
      return user;
    } catch (err) {
      throw err; 
    }
  }
  // @desc Register new user
  // @route POST /api/user/register
  async register(req, res) {
    console.log(req.body);
    const newUser = req.body;
  
    try {
      const user = await this.registerUser(newUser);
  
      res.json({
        email: user.email,
        activationToken: user.activationToken,
        firstName: user.firstName,
        lastName: user.lastName,
        token: jwt.sign({ id: user._id, role: user.role }, secret),
      });
    } catch (err) {
      console.error(err);
      res.status(400).json(err.message); 
    }
  }

   async login(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email.toLowerCase() });
      if (!user) {
        return res.status(401).json({ msg: "invalid login attempt-user not found" });
      }
      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ msg: "invalid login attempt- password incorrect" });
      }
      console.log(user);
      res.status(200).json({
        msg: "success!",
        token: jwt.sign({ id: user._id, role: user.role }, secret),
      });
    } catch (err) {
      console.error(err);
      res.status(400).json(err.message);
    }

  }

  getLoggedInUser(req, res) {
    let id = req.user.id;
    User.findById(id)
      .populate("country")
      .select("-Password")
      .then((user) => {
        res.json({ user });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
  activateUser(req, res) {
    let code = req.body.code;
    let id = req.user.id;
    console.log(code);
    console.log(id);
    User.findOne({ _id: id })
      .then((user) => {
        if (user.activationToken == code) {
          user
            .updateOne({
              activationToken: null,
              activated: true,
            })
            .then(() => res.json({ msg: "Success!" }))
            .catch((err) => res.status(400).json(err));
        } else {
          res.status(401).json({ msg: "Invalid activation code" });
        }
      })
      .catch((err) => res.status(400).json(err));
  }
  sendActivationEmail(req, res) {
    let id = req.user.id;

    User.findOne({ _id: id })
      .then((user) => {
        user.activationToken = generateRandomNumber();
        user
          .save()
          .then(() => {
            console.log({
              id: user._id,
              email: user.email,
              activationToken: user.activationToken,
              firstName: user.firstName,
              lastName: user.lastName,
            });
            res.json({
              id: user._id,
              email: user.email,
              activationToken: user.activationToken,
              firstName: user.firstName,
              lastName: user.lastName,
            });
          })
          .catch((err) => {
            res.status(400).json(err);
          });
      })
      .catch((err) => res.status(400).json(err));
  }
  uploadProfilePicture(req, res) {
    console.log('req.file');
    console.log(req.file);
    console.log('req.user');
    console.log(req.user);
    User.findOne({ _id: req.user.id })
      .then((user) => {
        user

          .updateOne({
            profilePic: {
              name: req.file.filename,
              details: req.file,
            },
          })
          .then(() => res.status(200).json({ msg: "Success!" }))
          .catch((err) => res.status(401).json(err));
      })
      .catch((err) => res.status(400).json(err));
  }
  completeUser(req, res) {
    console.log(req.body);
    console.log('req.file');
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
    User.find()
      .populate("country")
      .select("-Password")
      .then((users) => {
        res.json({ users });
      })
      .catch((err) => res.status(400).json(err));
  }
  getUser(req, res) {
    User.findOne({ _id: req.params.id })
      .populate("country")
      .select("-Password")
      .then((user) => {
        res.json({ user });
      })
      .catch((err) => res.status(400).json(err));
  }
}
module.exports = new UserController();
