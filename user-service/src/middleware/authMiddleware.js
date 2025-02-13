const jwt = require("jsonwebtoken");
const { requestTokenRenewal } = require("../../kafka/tokenProducer");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      console.log("Token expired, requesting renewal...");
      await requestTokenRenewal(token);
      return res.status(401).json({ message: "Token expired, renewal requested" });
    }
    res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = { authMiddleware };