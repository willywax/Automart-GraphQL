const express = require("express");
const validator = require("../middlewares/validatator");
const router = express.Router();

const carController = require("../controllers/cars");

const auth = require("../middlewares/authentication");

router.post(
  "/",
  auth,
  validator.checks.postCarCheck,
  validator.validationResults,
  carController.saveCar
);
router.get("/", carController.getCars);
router.get("/:id", carController.getCar);

router.get("/user/:id", auth, carController.getUserCars);

router.patch(
  "/:id/status",
  auth,
  validator.checks.patchCarCheckStatus,
  validator.validationResults,
  carController.updateCar
);

router.patch(
  "/:id/price",
  auth,
  validator.checks.patchCarCheckPrice,
  validator.validationResults,
  carController.updateCar
);
router.delete("/:id", auth, carController.deleteCar);

module.exports = router;
