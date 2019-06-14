const Car = require("../models/cars");

exports.saveCar = (req, res, next) => {
  /*UserId from token is used to create the Car Ad*/
  const newCar = new Car(
    req.body.token.userId,
    req.body.state,
    req.body.price,
    req.body.manufacturer,
    req.body.model,
    req.body.body_type
  );

  const car = Car.saveCar(newCar);

  const data = {
    status: 201,
    data: car
  };

  res.status(201).json(data);
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
  const car = Car.findById(req.params.id);

  const data = {
    status: 200,
    data: car
  };
  if (car != null) {
    res.status(200).json(data);
  } else {
    data.status = 404;
    res.status(404).json(data);
  }
};

exports.getUserCars = (req, res, next) => {
  if (req.body.token.role || req.body.token.userId === req.params.userId) {
    const cars = Car.findByUser(req.params.userId);

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
