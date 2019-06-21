/** Verifies if the User is a registered User */
const helper = require("../utils/helper");
const Response = require("../utils/response");
const User = require("../models/users");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const decodedToken = helper.decodeToken(token);

    let userId = decodedToken.userId;

    req.body.token = decodedToken;

    if (userId && userId !== null) {
      next();
    } else {
      res
        .status(401)
        .json(
          new Response(
            401,
            null,
            ["Invalid or expired token"],
            "Not Authorized"
          ).response()
        );
    }
  } catch (err) {
    res
      .status(401)
      .json(
        new Response(
          401,
          null,
          ["Error Occured when Authenticating"],
          "Not Authorized"
        ).response()
      );
  }
};
