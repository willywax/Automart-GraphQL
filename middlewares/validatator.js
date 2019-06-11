const { check } = require("express-validator/check");

const User = require("../models/users");
module.exports = {
  singUpCheck: [
    check("email")
      .isEmail()
      .withMessage("Must be a valid Email"),
    check("password")
      .trim(" ")
      .isLength({ min: 5 })
      .withMessage("Password must have a min of 5 characters"),
    check("firstName")
      .trim(" ")
      .isLength({ min: 1 })
      .withMessage("firstName is required Field"),
    check("lastName")
      .trim(" ")
      .isLength({ min: 1 })
      .withMessage("lastName is a required Field"),
    check("isAdmin")
      .isBoolean()
      .withMessage("isAdmin is a required field with boolean value"),
    check("email").custom(value => {
      let result = User.findUserByEmail(value);
      if (result !== null) {
        return Promise.reject("E-mail already in use");
      }
      return true;
    })
  ]
};
