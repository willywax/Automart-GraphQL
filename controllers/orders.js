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
  let orders = [];

  if (!req.body.token.role) {
    /*Get Orders created buy the User*/
    orders = Order.getOrdersByUser(req.body.token.userId);
  } else {
    orders = Order.getOrders();
  }

  const data = {
    status: 200,
    data: orders
  };

  res.status(200).json(data);
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
