const jwt = require("jsonwebtoken");
require('dotenv').config();

const secret = process.env.jwtSecret;

module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
  // Access the Authorization header
  const authorizationHeader = req.headers['authorization'];
  console.log(authorizationHeader);
  if (!authorizationHeader) {
    return res.status(401).json({ verified: false, message: 'Authorization header missing' });
  }

  // Extract the token from the Authorization header (assuming Bearer token format)
  const token = authorizationHeader.split(' ')[1];

  jwt.verify(token, secret, (err, payload) => {
    if (err) { 
      return res.status(401).json({ verified: false, message: 'Token verification failed' });
    } else {
      // Attach the payload to the request for further processing if needed
      req.user = payload;
      console.log(payload);
      console.log("authenticated");
      next();
    }
  });
};
  module.exports.authenticateAdmin = (req, res, next) => {
    jwt.verify(req.body.token, secret, (err, payload) => {
      console.log(payload);
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
  };
  