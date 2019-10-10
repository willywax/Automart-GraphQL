import Response from "../utils/response";
import OrderService from "../services/order_service";
import CarService from "../services/car_service";

class OrderController {
  async saveOrder(req, res, next) {
    try {
      req.body.buyer = req.body.user;
      const { buyer, price_offered, car } = req.body;

      let [carFound] = await CarService.findCar({ id: car });

      if (!carFound)
        return Response.notFoundError(res, "Invalid car Id passed");

      if (carFound.dataValues.owner === req.body.user)
        return Response.authorizationError(
          res,
          "Seller can not bid for their own car"
        );
      let foundOrder = await OrderService.findOrder({
        buyer,
        price_offered,
        car
      });

      if (foundOrder.length > 1)
        return Response.conflictError(res, "Order already saved");

      const newOrder = await OrderService.saveOrder(req.body);

      return Response.customResponse(
        res,
        201,
        "Order created successfully",
        newOrder
      );
    } catch (error) {
      return Response.serverError(res, error);
    }
  }

  async getOrder(req, res, next) {
    try {
      let orders = await OrderService.findOrder();

      if (orders.length < 1)
        return Response.notFoundError(res, "Order not found");

      return Response.customResponse(
        res,
        200,
        "Order retrieved successfully",
        orders
      );
    } catch (error) {
      return Response.serverError(res, error);
    }
  }

  async updateOrder(req, res, next) {
    try {
      req.body.buyer = req.body.user;
      let orders = await OrderService.findOrder({ id: req.params.id });

      if (orders.length < 1)
        return Response.notFoundError(res, "Order not found");

      let updatedOrder = await OrderService.updateOrder(req.body, {
        id: req.params.id
      });

      return Response.customResponse(
        res,
        200,
        "Order updated successfully",
        updatedOrder
      );
    } catch (error) {
      return Response.serverError(res, error);
    }
  }
}

export default new OrderController();
