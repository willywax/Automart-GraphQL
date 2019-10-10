import express from "express";
import orderController from "../controllers/orders";
import { checks, validationResults } from "../middlewares/validatator";
import auth from "../middlewares/authentication";

export const orderRouter = express.Router();

orderRouter.post(
  "/",
  auth,
  checks.postOrderCheck,
  validationResults,
  orderController.saveOrder
);

orderRouter.get("/", auth, orderController.getOrder);

orderRouter.patch(
  "/:id/price",
  auth,
  checks.updateOrderPriceCheck,
  validationResults,
  orderController.updateOrder
);

orderRouter.patch(
  "/:id/status",
  auth,
  checks.updateOrderStatusCheck,
  validationResults,
  orderController.updateOrder
);
