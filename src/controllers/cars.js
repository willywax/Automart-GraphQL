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

      const results = await CarService.getAll();
      const cars = results.map(car => car.dataValues)

      cars.forEach(car => {
        car.owner = car.User.dataValues
      })

      return cars;
    } catch (error) {
      throw error;
    }
  }

  async getOneCar(args, req) {
    try {
      isAuth(args, req)
      const foundCar = await CarService.getOne({ id: args.id });

      if (!foundCar) throw new Error('Car not found')

      foundCar.owner = foundCar.dataValues.User.dataValues;
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

      console.log('Args ', args);

      if (!args.user.role && foundCar.owner !== args.user.userId) throw new Error("Only admin can delete cars")

      let deletedCar = await CarService.deleteCar({ id: args.id });

      return deletedCar.dataValues;

    } catch (error) {
      throw error;
    }
  }
}

export default new CarController();
