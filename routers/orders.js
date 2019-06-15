const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orders");

const validators = require("../middlewares/validatator");

const auth = require("../middlewares/authentication");

router.post(
  "/",
  auth,
  validators.checks.postOrderCheck,
  validators.validationResults,
  orderController.saveOrder
);

router.get("/", auth, orderController.getOrder);

router.patch(
  "/:id/price",
  auth,
  validators.checks.updateOrderPriceCheck,
  validators.validationResults,
  orderController.updatePrice
);

router.patch(
  "/:id/status",
  auth,
  validators.checks.updateOrderStatusCheck,
  validators.validationResults,
  orderController.updateStatus
);

module.exports = router;
