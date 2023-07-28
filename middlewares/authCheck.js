const jwt = require('jsonwebtoken');
const config = require('../configs/user.config');

authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, config.secret, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

const checkToken = {
    authenticateToken
  };
  
module.exports = checkToken;