const jwt = require("jsonwebtoken");
require('dotenv').config();

const secret = process.env.jwtSecret;

module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
    console.log(req.body);
    jwt.verify(req.body.token, secret, (err, payload) => {
      if (err) { 
        console.log('error');
        res.status(401).json({verified: false});
      } else {
        console.log('next');
        next();
      }
    });
  }
  module.exports.authenticateAdmin = (req, res, next) => {
    jwt.verify(req.body.token, secret, (err, payload) => {
      console.log(req.body.token);
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
    jwt.verify(req.body.token, secret, (err, payload) => {
      console.log(req.body.token);
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
  