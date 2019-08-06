import User from "../models/users";
import Response from "../utils/response";
import { generateToken, removeKeys } from "../utils/helper";

class UserController {
  signUp(req, res, next) {
    const newUser = new User(req.body);

    User.saveUser(newUser, (err, user) => {
      if (err) {
        res
          .status(404)
          .json(new Response(404, null, err, "Sign Up Failed").response());
      } else {
        user[0].token = generateToken(user[0]);
        user[0] = removeKeys(user[0], ["password"]);
        res
          .status(201)
          .json(
            new Response(201, user, null, "Registered Succcessfully").response()
          );
      }
    });
  }

  login(req, res, next) {
    const user = {
      email: req.body.email,
      password: req.body.password
    };

    User.logInUser(user, (err, user) => {
      if (err) {
        res
          .status(404)
          .json(new Response(404, null, err, "Incorrect Details").response());
      } else {
        res
          .status(200)
          .json(
            new Response(200, user, null, "Signed In Succcessfully").response()
          );
      }
    });
  }
}

export default new UserController();
