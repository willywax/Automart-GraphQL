const express = require("express");

const router = express.Router();

const flagController = require("../controllers/flags");

const auth = require("../middlewares/authentication");

router.post("/", auth, flagController.flagCar);
router.get("/", auth, flagController.getFlags);

module.exports = router;
