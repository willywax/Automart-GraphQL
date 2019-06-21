/** Verifies if the User is a registered User */
const helper = require("../utils/helper");
const Response = require("../utils/response");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    req.body.token = helper.decodeToken(token);
    if (req.body.token.userId && req.body.token.userId !== null) {
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
