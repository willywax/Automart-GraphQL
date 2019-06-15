/** Verifies if the User is a registered User */
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const decodedToken = jwt.verify(token, "RANDOM_TOKEN");
    const userId = decodedToken.userId;
    req.body.token = decodedToken;

    if (userId && userId !== null) {
      next();
    } else {
      res.status(401).json({
        error: "Not Authorized. Invalid or expired Token"
      });
    }
  } catch (err) {
    res.status(401).json({
      error: "Not Authorized"
    });
  }
};
