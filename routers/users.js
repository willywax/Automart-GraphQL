const express = require("express");

const router = express.Router();

const validator = require("../middlewares/validatator");

const setup = require("../middlewares/setup");

const userController = require("../controllers/users");
const adminController = require("../controllers/admin");

router.post(
  "/signup",
  setup.users,
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

router.post(
  "/setup",
  setup.admin,
  validator.checks.checkAdmin,
  validator.validationResults,
  adminController.createAdmin
);

module.exports = router;
