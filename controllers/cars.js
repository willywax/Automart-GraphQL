import Response from "../utils/response";
import Car from "../models/cars";

class CarController {
  async saveCar(req, res, next) {
    try {
      let newCar = new Car(req.body);

      let car = await Car.saveCar(newCar);

      res
        .status(201)
        .json(
          new Response(201, car, null, "Car created Successfully").response()
        );
    } catch (error) {
      res
        .status(404)
        .json(new Response(404, null, err, "Car failed to create").response());
    }
  }
  /** 
  saveCar(req, res, next) {
   
    let newCar = new Car(req.body);

    Car.saveCar(newCar, (err, car) => {
      if (err) {
        res
          .status(404)
          .json(
            new Response(404, null, err, "Car failed to create").response()
          );
      } else {
        res
          .status(201)
          .json(
            new Response(201, car, null, "Car created Successfully").response()
          );
      }
    });
  }
  **/

  getCars(req, res, next) {
    let queries = req.query;

    Car.searchCars(queries, (err, cars) => {
      if (err) {
        res
          .status(404)
          .json(new Response(404, null, err, "Failed to get Cars").response());
      } else {
        let response =
          cars.length === 0
            ? new Response(404, cars, null, "No Car Found").response()
            : new Response(
                200,
                cars,
                null,
                "Car Returned Successfully"
              ).response();
        res.status(response.status).json(response);
      }
    });
  }

  getOneCar(req, res, next) {
    console.log("ID " + req.params.id);
    let result = Car.findById(req.params.id);

    result
      .then(car => {
        let response =
          car.rows.length === 0
            ? new Response(404, car.rows, null, "Car not Found").response()
            : new Response(200, car.rows, null, "Car Found").response();
        res.status(response.status).json(response);
      })
      .catch(err => {
        res
          .status(404)
          .json(new Response(404, null, err, "Car Not found").response());
      });
  }

  updateCar(req, res, next) {
    let findCar = Car.findById(req.params.id);

    Car.updateOne(req.params.id, req.body, (err, cars) => {
      if (err) {
        res
          .status(404)
          .json(
            new Response(404, null, err, "Failed to update Cars").response()
          );
      } else {
        let response =
          cars.length === 0
            ? new Response(
                404,
                cars,
                null,
                "Failed to update Car. Car Invalid Id"
              ).response()
            : new Response(
                200,
                cars,
                null,
                "Car Updated Successfully"
              ).response();
        res.status(response.status).json(response);
      }
    });
  }

  deleteCar(req, res, next) {
    if (req.body.token.role) {
      let result = Car.deleteOne(req.params.id);
      result
        .then(car => {
          let response =
            car.rowCount === 0
              ? new Response(404, car.rows, null, "Car not Found").response()
              : new Response(
                  200,
                  car.rows,
                  null,
                  "Car Deleted sucessfully"
                ).response();
          res.status(response.status).json(response);
        })
        .catch(err => {
          res
            .status(404)
            .json(
              new Response(404, null, err, "Failed to delete Car").response()
            );
        });
    } else {
      res
        .status(401)
        .json(
          new Response(401, null, "Not Authorized", "Only admin can delete Car")
        );
    }
  }
}

export default new CarController();
