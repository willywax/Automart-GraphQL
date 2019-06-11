const express = require("express");
const validator = require("../middlewares/validatator");
const router = express.Router();

const carController = require("../controllers/cars");

router.post(
  "/",
  validator.checks.postCarCheck,
  validator.validationResults,
  carController.saveCar
);
router.get("/", carController.getCars);
router.get("/:id", carController.getCar);
router.patch("/:id/status", carController.updateCar);
router.patch("/:id/price", carController.updateCar);
router.delete("/:id", carController.deleteCar);

module.exports = router;
