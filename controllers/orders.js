const Order = require("../models/orders");
const Car = require("../models/cars");

exports.saveOrder = (req, res, next) => {
  const buyer = req.body.token.userId;

  const car = Car.findById(req.body.car);

  if (buyer !== car.owner) {
    const newOrder = new Order(buyer, req.body.car, req.body.amount);

    Order.saveOrder(newOrder);
    const order = Order.findById(newOrder.id);

    const data = {
      status: 201,
      data: order
    };

    res.status(201).json(data);
  } else {
    res.status(404).json({
      error: "Cannot create PO for your own Car Ad"
    });
  }
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

  const data = {};

  if (order !== null) {
    if (
      (order.status === "pending" && req.body.token.userId === order.buyer) ||
      req.body.token.role
    ) {
      order.price_offered = req.body.amount;
      const result = Order.updateOrder(order);

      data.status = 200;
      data.data = result;
    } else {
      data.status = 404;
      data.error = "Order not found or is not pending";
    }
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
