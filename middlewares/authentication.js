/** Verifies if the User is a registered User */
import { decodeToken } from "../utils/helper";
import Response from "../utils/response";

export default (req, res, next) => {
  try {
    const token = req.headers.authorization;
    let decodedToken = decodeToken(token);

    if (!decodeToken)
      Response.authorizationError(res, "Invalid or expired token used");
    req.body.user = decodedToken.userId;
    req.body.is_admin = decodedToken.role;

    next();
  } catch (err) {
    Response.authorizationError(res, "Invalid or expired token used");
  }
};
