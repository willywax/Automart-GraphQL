import { check, validationResult } from "express-validator/check";
import Response from "../utils/response";

export let checks = {
  checkAdmin: [
    check("email")
      .isEmail()
      .withMessage("Must have a valid Email"),
    check("password")
      .trim(" ")
      .isLength({ min: 10 })
      .withMessage("Password must have a min of 10 characters")
  ],
  singUpCheck: [
    check("email")
      .isEmail()
      .withMessage("Must be a valid Email"),
    check("password")
      .trim(" ")
      .isLength({ min: 5 })
      .withMessage("Password must have a min of 5 characters"),
    check("first_name")
      .trim(" ")
      .isLength({ min: 1 })
      .withMessage("first_name is required Field"),
    check("last_name")
      .trim(" ")
      .isLength({ min: 1 })
      .withMessage("last_name is a required Field"),
    check("address")
      .trim(" ")
      .isLength({ min: 5 })
      .withMessage("address is a required Field. Min 5 characters")
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
      .withMessage("body_type is required"),
    check("price")
      .isDecimal()
      .escape()
      .withMessage("price field is required")
      .custom(value => {
        if (value <= 0) {
          throw new Error("Price must be a number and larger than 0");
        }
        return true;
      }),
    check("manufacturer")
      .isString()
      .trim(" ")
      .escape()
      .withMessage("manufacturer field is required")
  ],
  patchCarCheck: [
    check("state")
      .optional()
      .isIn(["used", "new"])
      .withMessage("State needs to be [used, new] "),
    check("status")
      .optional()
      .isIn(["available", "sold"])
      .withMessage("Status needs to be [available, sold] "),
    check("model")
      .optional()
      .isString()
      .trim(" ")
      .escape()
      .withMessage("model is required"),
    check("body_type")
      .optional()
      .isString()
      .escape()
      .trim(" ")
      .withMessage("body_type is required"),
    check("price")
      .optional()
      .isDecimal()
      .escape()
      .withMessage("price field is required")
      .custom(value => {
        if (value <= 0) {
          throw new Error("Price must be a number and larger than 0");
        }
        return true;
      }),
    check("manufacturer")
      .optional()
      .isString()
      .trim(" ")
      .escape()
      .withMessage("manufacturer field is required")
  ],
  postOrderCheck: [
    check("car")
      .isInt()
      .escape()
      .withMessage("Car is a required Field and must be an integer"),
    check("price_offered")
      .isDecimal()
      .withMessage("price_offered is a required Field")
  ],
  updateOrderPriceCheck: [
    check("price_offered")
      .isDecimal()
      .withMessage("price_offered field is required")
      .custom(value => {
        if (value <= 0) {
          throw new Error("price_offered must be a number and larger than 0");
        }
        return true;
      })
  ],
  updateOrderStatusCheck: [
    check("status")
      .isIn(["pending", "accepted", "rejected"])
      .withMessage("State needs to be [pending, accepted, rejected] ")
  ]
};

export let validationResults = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(
        new Response(422, null, errors.array(), "Invalid Input").response()
      );
  } else {
    next();
  }
};
