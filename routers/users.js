const express = require("express");

const router = express.Router();

const validator = require("../middlewares/validatator");

const userController = require("../controllers/users");

router.post(
  "/signup",
  validator.checks.singUpCheck,
  validator.validationResults,
  userController.signUp
);
router.post(
  "/signin",
  validator.checks.singInCheck,
  validator.validationResults,
  userController.login
);

module.exports = router;
