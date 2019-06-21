const Order = require("../models/orders");
const Response = require("../utils/response");

exports.saveOrder = (req, res, next) => {
  req.body.buyer = req.body.token.userId;
  const newOrder = new Order(req.body);

  Order.saveOrder(newOrder, (err, order) => {
    if (err) {
      res
        .status(404)
        .json(
          new Response(404, null, err, "Order failed to create").response()
        );
    } else {
      res
        .status(201)
        .json(
          new Response(
            201,
            order,
            null,
            "Order created successfully"
          ).response()
        );
    }
  });
};

exports.getOrder = (req, res, next) => {
  Order.getOrders((err, result) => {
    if (err) {
      res.status(404).json({
        error: err
      });
    } else {
      res.status(200).json({
        data: result
      });
    }
  });
};

exports.updateOrder = (req, res, next) => {
  Order.updateOrder(req.params.id, req.body, (err, order) => {
    if (err) {
      res
        .status(404)
        .json(
          new Response(404, null, err, "Order failed to create").response()
        );
    } else {
      res
        .status(200)
        .json(
          new Response(
            200,
            order,
            null,
            "Order created successfully"
          ).response()
        );
    }
  });
};
