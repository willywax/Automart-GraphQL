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

exports.updatePrice = (req, res, next) => {
  const order = Order.findById(req.params.id);

  console.log(order);
  const data = {};

  if (
    order !== null &&
    order.status === "pending" &&
    (req.body.token.userId === order.buyer || req.body.token.role)
  ) {
    order.price_offered = req.body.amount;
    const result = Order.updateOrder(order);

    data.status = 200;
    data.data = result;
  } else {
    data.status = 404;
    data.error = "Order not found or is not pending";
  }
  res.status(data.status).json(data);
};

exports.updateStatus = (req, res, next) => {
  const order = Order.findById(req.params.id);

  if (order !== null) {
    order.status = req.body.status;
    const result = Order.updateOrder(order);

    const data = {
      status: 200,
      data: result
    };

    res.status(200).json(data);
  } else {
    const data = {
      status: 404,
      error: "Order not found or is not pending"
    };
    res.status(404).json(data);
  }
};
