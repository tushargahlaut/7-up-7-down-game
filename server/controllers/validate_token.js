const { decodeToken } = require("../utils/jwt_utils");


const validate_token = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "No Token was provided",
    });
  }
  try {
    const payload = decodeToken(token);
    req.user = payload;
    next();
  } catch (error) {
     console.log("Couldn't Verify Token", error);
    return res.status(401).json({
      message: "Couldn't verify token",
    });
  }
}


module.exports = {validate_token};