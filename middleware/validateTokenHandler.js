const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: "User is not authorized" });
      }
      req.user = decoded.user;
      console.log("bbbbb", req.user);
      next();
    });

    if (!token) {
      res
        .status(401)
        .json({ error: "User is not authorized or token is missing" });
    }
  }
};

module.exports = validateToken;
