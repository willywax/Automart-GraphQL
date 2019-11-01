import Response from "../utils/response";
import CarService from "../services/car_service";

class CarController {
  async saveCar(req, res, next) {
    try {
      req.body.owner = req.body.user;
      const { manufacturer, model, state, body_type, price, owner } = req.body;
      let foundCar = await CarService.findCar({
        manufacturer,
        model,
        state,
        body_type,
        price,
        owner
      });

      if (foundCar.length > 0)
        return Response.conflictError(res, "Car already saved");

      let car = await CarService.saveCar(req.body);
      return Response.customResponse(res, 201, "Car created successfully", car);
    } catch (error) {
      Response.serverError(res, "Something went wrong");
    }
  }

  async getCars(req, res, next) {
    try {
      let cars = await CarService.findCar({});
      Response.customResponse(res, 200, "Car retrieved successfully", cars);
    } catch (error) {
      Response.serverError(res, error);
    }
  }

  async getOneCar(req, res, next) {
    try {
      const foundCar = await CarService.findCar({ id: req.params.id });

      if (foundCar.length < 1)
        return Response.notFoundError(res, "Car not found");

      Response.customResponse(res, 200, "Car retrieved successfully", foundCar);
    } catch (error) {
      return Response.serverError(res, error);
    }
  }

  async updateCar(req, res, next) {
    try {
      req.body.owner = req.body.user;
      const foundCar = await CarService.findCar({ id: req.params.id });

      if (foundCar.length === 0)
        return Response.notFoundError(res, "Car not Found");

      let updatedCar = await CarService.updateCar(
        { id: req.params.id },
        req.body
      );

      return Response.customResponse(
        res,
        200,
        "Car updated successfully",
        updatedCar
      );
    } catch (error) {
      return Response.serverError(res, "Something went wrong");
    }
  }

  async deleteCar(req, res, next) {
    try {
      const foundCar = await CarService.findCar({ id: req.params.id });

      if (foundCar.length === 0)
        return Response.notFoundError(res, "Car not Found");

      if (!req.body.is_admin && foundCar.owner !== req.user.id)
        return Response.authorizationError(res, "Only admin can delete cars");
      let deletedCar = await CarService.deleteCar({ id: req.params.id });

      return Response.customResponse(
        res,
        200,
        "Car deleted successfully",
        deletedCar
      );
    } catch (error) {
      return esponse.serverError(res, "Something went wrong");
    }
  }
}

export default new CarController();
