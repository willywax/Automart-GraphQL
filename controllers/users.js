const jwt = require("jsonwebtoken");
const User = require("../models/users");

const { validationResult } = require("express-validator/check");

exports.signUp = (req, res, next) => {
  var errors = validationResult(req);

  if (errors.isEmpty()) {
    const newUser = new User(
      req.body.firstName,
      req.body.lastName,
      req.body.password,
      req.body.email,
      req.body.address,
      req.body.isAdmin
    );

    const user = User.saveUser(newUser);

    const token = jwt.sign({ userId: user.id }, "RANDOM_TOKEN", {
      expiresIn: "24h"
    });

    user.token = token;

    const data = {
      status: 201,
      data: user
    };
    res.status(201).json(data);
  } else {
    res.status(422).json(errors.array());
  }
};

exports.login = (req, res, next) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const response = User.logInUser(user);

  if (response.authenticated) {
    const token = jwt.sign({ userId: user.id }, "RANDOM_TOKEN", {
      expiresIn: "24h"
    });

    user.token = token;

    const data = {
      status: 200,
      data: response.data
    };
    res.status(200).json(data);
  } else {
    const data = {
      status: 401,
      data: response
    };
    res.status(401).json(data);
  }
};
