const { check, validationResult } = require("express-validator/check");

const User = require("../models/users");
const Car = require("../models/cars");

exports.checks = {
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
  ],
  singInCheck: [
    check("email")
      .isEmail()
      .withMessage("Must be a valid Email"),
    check("password")
      .trim(" ")
      .isLength({ min: 1 })
      .withMessage("password is field is required")
  ],
  postCarCheck: [
    check("owner")
      .trim(" ")
      .escape()
      .isString()
      .custom(value => {
        let result = User.findUserById(value);
        if (result === null) {
          return Promise.reject("Invalid Owner Id used");
        }
        return true;
      }),
    check("state")
      .isIn(["used", "new"])
      .withMessage("State needs to be [used, new] "),
    check("status")
      .optional()
      .isIn(["available", "sold"])
      .withMessage("Status needs to be [available, sold] "),
    check("model")
      .isString()
      .trim(" ")
      .escape()
      .withMessage("model is required"),
    check("body_type")
      .isString()
      .escape()
      .trim(" ")
      .withMessage("body_type is required")
  ],
  postOrderCheck: [
    check("car")
      .trim(" ")
      .isString()
      .escape()
      .withMessage("Car is a required Field"),
    check("car").custom(value => {
      let result = Car.findById(value);
      if (result === null) {
        return Promise.reject("Invalid Car Id used");
      }
      return true;
    }),
    check("buyer")
      .trim(" ")
      .isString()
      .escape()
      .withMessage("buyer is a required Field"),
    check("buyer").custom(value => {
      let result = User.findUserById(value);
      if (result === null) {
        return Promise.reject("Invalid Buyer Id used");
      }
      return true;
    }),
    check("amount")
      .isDecimal()
      .withMessage("amount is a required Field")
  ],
  updateOrderPriceCheck: [
    check("amount")
      .isDecimal()
      .withMessage("amount field is required")
  ],
  updateOrderStatusCheck: [
    check("status")
      .isIn(["pending", "accepted", "rejected"])
      .withMessage("State needs to be [pending, accepted, rejected] ")
  ]
};

exports.validationResults = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json(errors.array());
  } else {
    next();
  }
};
