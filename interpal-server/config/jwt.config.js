const jwt = require("jsonwebtoken");
require('dotenv').config();

const secret = process.env.jwtSecret;

module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
      if (err) { 
        res.status(401).json({verified: false});
      } else {
        next();
      }
    });
  }
  module.exports.authenticateAdmin = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
      if (err) { 
        res.status(401).json({verified: false});
      } else {
        if(payload.user.role==="admin"){
          next();
        }else{
          res.status(401).json({verified: false});
        }
      }
    });
  }
  module.exports.authenticateOwner = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
      console.log(req);
      if (err) {
        res.status(401).json({ verified: false });
      } else {
        if (payload.user.jobs.includes(req.params.id) || payload.user.role === "admin") {
          next();
        } else {
          res.status(401).json({ verified: false });
        }
      }
    });
  };
  