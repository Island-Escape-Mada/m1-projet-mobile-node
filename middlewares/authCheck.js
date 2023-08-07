const jwt = require('jsonwebtoken');
const config = require('../configs/user.config');

authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token != config.token) {
    res.status(403).send("Access denied");
  }

}

const checkToken = {
    authenticateToken
  };
  
module.exports = checkToken;