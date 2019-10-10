import UserService from "../services/users_service";
import Response from "../utils/response";
import { generateToken, removeKeys, encrypt, decrypt } from "../utils/helper";

class UserController {
  async signUp(req, res, next) {
    try {
      const { email, password } = req.body;
      let foundUser = await UserService.findUser({ email });
      if (foundUser) return Response.conflictError(res, "User already exists");

      req.body.password = encrypt(password);

      let newUser = await UserService.saveUser(req.body);

      newUser.dataValues.token = generateToken(newUser);
      return Response.customResponse(
        res,
        201,
        "User added successfully",
        newUser
      );
    } catch (error) {
      return Response.serverError(res, error);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(email);
      let foundUser = await UserService.findUser({ email });

      if (!foundUser)
        return Response.authenticationError(
          res,
          "Incorrect email or password used"
        );

      let authenticated = decrypt(foundUser.password, password);

      if (!authenticated)
        return Response.authenticationError(
          res,
          "Incorrect email or password used"
        );

      foundUser.dataValues.token = generateToken(foundUser);

      return Response.customResponse(
        res,
        200,
        "User authenticated successfully",
        foundUser
      );
    } catch (error) {
      return Response.serverError(res, error);
    }
  }
}

export default new UserController();
