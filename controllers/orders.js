const Order = require("../models/orders");

exports.saveOrder = (req, res, next) => {
  const newOrder = new Order(req.body.buyer, req.body.car, req.body.amount);

  Order.saveOrder(newOrder);
  const order = Order.findById(newOrder.id);

  const data = {
    status: 201,
    data: order
  };

  res.status(201).json(data);
};

exports.getOrder = (req, res, next) => {
  const orders = Order.getOrders();

  const data = {
    status: 200,
    data: orders
  };

  res.status(200).json(data);
};

exports.updatePrice = (req, res, next) => {
  const order = Order.findById(req.params.id);

  if (order !== null && order.status === "pending") {
    order.price_offered = req.body.amount;
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
