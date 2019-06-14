const express = require("express");

const router = express.Router();

const flagController = require("../controllers/flags");

const auth = require("../middlewares/authentication");

router.post("/", flagController.flagCar);
router.get("/", flagController.getFlags);

module.exports = router;
