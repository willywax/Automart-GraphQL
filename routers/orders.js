const express = require("express");

const router = express.Router();

const orderController = require("../controllers/orders");

const validators = require("../middlewares/validatator");

router.post(
  "/",
  validators.checks.postOrderCheck,
  validators.validationResults,
  orderController.saveOrder
);
router.get("/", orderController.getOrder);
router.patch(
  "/:id/price",
  validators.checks.updateOrderPriceCheck,
  validators.validationResults,
  orderController.updatePrice
);
router.patch(
  "/:id/status",
  validators.checks.updateOrderStatusCheck,
  validators.validationResults,
  orderController.updateStatus
);

module.exports = router;
