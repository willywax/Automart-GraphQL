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
          new Response(201, car, null, "Car created successfully").response()
        );
    }
  });
};

exports.getCars = (req, res, next) => {
  let cars = Car.getCars();
  const queries = req.query;

  const data = {
    status: 200,
    data: cars
  };

  if (Object.keys(queries).length) {
    cars = Car.searchCar(queries);
    data.data = cars;
    res.status(200).json(data);
  }
  res.status(200).json(data);
};

exports.getCar = (req, res, next) => {
  let result = Car.findById(req.params.id);

  result
    .then(car => {
      let response =
        car.rows.length === 0
          ? new Response(200, car.rows, null, "Car not Found").response()
          : new Response(200, car.rows, null, "Car Found").response();
      res.status(200).json(response);
    })
    .catch(err => {
      res
        .status(404)
        .json(new Response(404, null, err, "Car Not found").response());
    });
};

exports.getUserCars = (req, res, next) => {
  if (req.body.token.role || req.body.token.userId === req.params.userId) {
    const cars = req.body.token.role
      ? Car.getCars()
      : Car.findByUser(req.params.userId);

    const data = {
      status: 200,
      data: cars
    };

    res.status(200).json(data);
  } else {
    res.status(401).json({
      error: "Not Authorised"
    });
  }
};

exports.updateCar = (req, res, next) => {
  const car = Car.findById(req.params.id);

  if (car !== null) {
    if (req.body.price) {
      car.price = req.body.price;
    } else {
      car.status = req.body.status;
    }

    const result = Car.updateOne(car);
    const data = {
      status: 200,
      data: result
    };

    res.status(200).json(data);
  } else {
    res.status(404).json({
      error: "Car not Found. Invalid Car Id used"
    });
  }
};

exports.deleteCar = (req, res, next) => {
  const car = Car.findById(req.params.id);

  if (car !== null) {
    if (req.body.token.role || req.body.token.userId === car.owner) {
      const result = Car.deleteOne(car);

      const data = {
        status: 200,
        data: result
      };

      res.status(200).json(data);
    } else {
      res.status(401).json({
        error: "Not Authorised to delete Car"
      });
    }
  }
  res.status(404).json({
    error: "Car not Found"
  });
};
