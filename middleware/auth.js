const jwt = require('jsonwebtoken');
const config = require('config');

//middleware function has access to req and res cycle and objects & has a callback to have the next piece of middleware to run
module.exports = function (req, res, next) {
  //Get token from header
  const token = req.header('x-auth-token');

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    //decodes token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //take the req object and assign value to user
    // decoded has user in the payload so we are setting the req.user
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
