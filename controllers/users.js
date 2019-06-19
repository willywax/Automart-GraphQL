const User = require("../models/users");
const Response = require("../utils/response");

exports.signUp = (req, res, next) => {
  const newUser = new User(req.body);

  User.saveUser(newUser, (err, user) => {
    if (err) {
      res
        .status(404)
        .json(new Response(404, null, err, "Sign Up Failed").response());
    } else {
      res
        .status(201)
        .json(
          new Response(201, user, null, "Registered Succcessfully").response()
        );
    }
  });
};

exports.login = (req, res, next) => {
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
        .status(201)
        .json(
          new Response(201, user, null, "Signed In Succcessfully").response()
        );
    }
  });
};
