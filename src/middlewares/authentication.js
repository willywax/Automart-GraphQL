/** Verifies if the User is a registered User */
import { decodeToken } from "../utils/helper";


export default (args, req, next) => {
  try {
    const token = req.headers.authorization;
    let decodedToken = decodeToken(token);

    if (!decodedToken) throw new Error('Token has expired');

    args.user = {...decodedToken}
    // args.user.is_admin = decodedToken.role;

    // next();
  } catch (err) {
    throw err
  }
};
