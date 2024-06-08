const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (payload) => {
  const token = jwt.sign({ payload }, jwtSecret, { expiresIn: "3h" });
  return token;
};

const decodeToken = (token) => {
  const payload = jwt.verify(token, jwtSecret);
  return payload;
};

module.exports = { generateToken, decodeToken };
