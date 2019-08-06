import express from "express";
import { checks, validationResults } from "../middlewares/validatator";

export const carRouter = express.Router();

import carController from "../controllers/cars";
import auth from "../middlewares/authentication";

carRouter.post(
  "/",
  auth,
  checks.postCarCheck,
  validationResults,
  carController.saveCar
);
carRouter.get("/", carController.getCars);
carRouter.get("/:id", carController.getOneCar);

carRouter.patch(
  "/:id/status",
  auth,
  checks.patchCarCheckStatus,
  validationResults,
  carController.updateCar
);

carRouter.patch(
  "/:id/price",
  auth,
  checks.patchCarCheckPrice,
  validationResults,
  carController.updateCar
);

carRouter.delete("/:id", auth, carController.deleteCar);
