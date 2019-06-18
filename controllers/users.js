const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Response = require("../utils/response");

const { validationResult } = require("express-validator/check");

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

  const response = User.logInUser(user);

  if (response.authenticated) {
    const data = {
      status: 200,
      data: response.data
    };

    res.status(200).json(data);
  } else {
    const data = {
      status: 401,
      error: "Incorrect Credential"
    };
    res.status(401).json(data);
  }
};
