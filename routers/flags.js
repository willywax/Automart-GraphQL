const express = require("express");

const router = express.Router();

const flagController = require("../controllers/flags");

router.post("/", flagController.flagCar);

module.exports = router;
