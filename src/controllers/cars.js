import CarService from "../services/car_service";
import isAuth from '../middlewares/authentication';

class CarController {
  async saveCar(args, req) {
    try {
      isAuth(args, req);
      
      const { user } = args;
      delete args.user;
      const { manufacturer, model, state, body_type, price, owner } = args;
      const foundCar = await CarService.getOne({
        manufacturer,
        model,
        state,
        body_type,
        price: parseInt(price),
        owner: parseInt(owner)
      });

      if (foundCar) throw new Error("Car already saved");

      const car = await CarService.saveCar(args);
      return car.dataValues;
  
    } catch (error) {
      throw new Error(error)
    }
  }

  async getCars(args, req, next) {
    try {
      isAuth(args, req);

      // Removing the users key from search
      delete args.user;

      let cars = await CarService.getAll();
      console.log(cars);
      return cars;
    } catch (error) {
      throw error;
    }
  }

  async getOneCar(args, req) {
    try {
      isAuth(args, req)
      const foundCar = await CarService.getOne({ id: args.id });

      console.log('Found Car ', foundCar);

      if (!foundCar) throw new Error('Car not found')

      return foundCar.dataValues;
    } catch (error) {
      throw error;
    }
  }

  async updateCar(args, req) {
    try {
      isAuth(args, req);
      args.owner = req.body.user;
      const foundCar = await CarService.getOne({ id: args.id });

      if (foundCar.length === 0) throw new Error('Car not Found')

      let updatedCar = await CarService.updateCar(
        { id: args.id },
        ...args
      );

      return updatedCar.dataValues;

    } catch (error) {
      throw error;
    }
  }

  async deleteCar(args, req) {
    try {
      isAuth(args, req);
      const foundCar = await CarService.getOne({ id: args.id });

      if (!foundCar) throw new Error('Car not Found')

      if (!args.is_admin && foundCar.owner !== args.user.id) throw new Error("Only admin can delete cars")

      let deletedCar = await CarService.deleteCar({ id: req.params.id });

      return deletedCar.dataValues;

    } catch (error) {
      throw error;
    }
  }
}

export default new CarController();
