const express = require("express");

const router = express.Router();

const validator = require("../middlewares/validatator");

const userController = require("../controllers/users");

router.post("/signup", validator.singUpCheck, userController.signUp);
router.post("/signin", userController.login);

module.exports = router;
