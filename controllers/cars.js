import Response from "../utils/response";

class CarController {
  async saveCar(req, res, next) {
    try {
      return Response.customResponse(
        201,
        res,
        "Car created successfully",
        "data"
      );
    } catch (error) {
      res
        .status(404)
        .json(new Response(404, null, err, "Car failed to create").response());
    }
  }

  getCars(req, res, next) {}

  getOneCar(req, res, next) {
    console.log("ID " + req.params.id);
  }

  updateCar(req, res, next) {}

  deleteCar(req, res, next) {}
}

export default new CarController();
