const Car = require("../models/cars");
const Response = require("../utils/response");

exports.saveCar = (req, res, next) => {
  /*UserId from token is used to create the Car Ad*/
  const newCar = new Car(req.body);

  Car.saveCar(newCar, (err, car) => {
    if (err) {
      res
        .status(404)
        .json(new Response(404, null, err, "Car failed to create").response());
    } else {
      res
        .status(201)
        .json(
          new Response(201, car, null, "Car created Successfully").response()
        );
    }
  });
};

exports.getCars = (req, res, next) => {
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
};

exports.getCar = (req, res, next) => {
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
};

exports.updateCar = (req, res, next) => {
  Car.updateOne(req.params.id, req.body, (err, cars) => {
    if (err) {
      res
        .status(404)
        .json(new Response(404, null, err, "Failed to update Cars").response());
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
              cars[0],
              null,
              "Car Updated Successfully"
            ).response();
      res.status(response.status).json(response);
    }
  });
};

exports.deleteCar = (req, res, next) => {
  if (req.body.token.role) {
    Car.deleteOne(req.params.id, (err, cars) => {
      if (err) {
        res
          .status(404)
          .json(
            new Response(404, null, err, "Failed to delete Car").response()
          );
      } else {
        let response =
          cars.rowCount === 0
            ? new Response(
                404,
                cars.rows,
                null,
                "No car deleted. Invalid car Id "
              ).response()
            : new Response(
                200,
                cars.rows,
                null,
                "Car Deleted Successfully"
              ).response();
        res.status(response.status).json(response);
      }
    });
  } else {
    res
      .status(401)
      .json(
        new Response(401, null, "Not Authorized", "Only admin can delete Car")
      );
  }
};
