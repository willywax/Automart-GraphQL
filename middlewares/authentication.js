/** Verifies if the User is a registered User */
const helper = require("../utils/helper");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const decodedToken = helper.decodeToken(token);

    let userId = decodedToken.userId;

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
