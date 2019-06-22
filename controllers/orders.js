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
  Order.getOrders()
    .then(orders => {
      res
        .status(200)
        .json(new Response(200, orders, null, "Orders Queried successfully"));
    })
    .catch(err => {
      res
        .status(404)
        .json(new Response(404, null, err, "Failed to get Orders"));
    });
};

exports.updateOrder = (req, res, next) => {
  Order.updateOrder(req.params.id, req.body, (err, orders) => {
    if (err) {
      res
        .status(404)
        .json(
          new Response(404, null, err, "Order failed to update").response()
        );
    } else {
      let response =
        orders.length === 0
          ? new Response(
              404,
              orders,
              null,
              "Failed to update Order. Invalid Order Id"
            ).response()
          : new Response(
              200,
              orders,
              null,
              "Order Updated Successfully"
            ).response();
      res.status(response.status).json(response);
    }
  });
};
