const jwt = require("jsonwebtoken");
require("dotenv").config();
//After successful regester of user, and then calling the login endpoint with the already regestered user, It will create and return JWT Token
const generateJwtToken = (userData) => {

  return jwt.sign(userData, process.env.PRIVATE_KEY, {expiresIn:400000});
}

//After login, we are getting the token, and for validating the JWT Token, that it is correct or not,, we will proceed with secure routes, to GET/POST/UPDATE/DELETE.
const validateJwtToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY); // Verify token using the secret key
    req.user = decoded; // Store decoded user info in request object
    next(); // Move to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = {generateJwtToken, validateJwtToken};