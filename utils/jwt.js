const jwt = require("jsonwebtoken");
const jwtSecret = "your_jwt_secret"; // Use environment variable for production

// Generate a JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
    expiresIn: "4h", // Adjust token expiration as needed
  });
};

// Verify a JWT token
const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
