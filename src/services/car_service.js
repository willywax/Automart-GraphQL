import database from "../database/models";

const { Cars, Users } = database;
class CarService {
  static async saveCar(car) {
    try {
      return await Cars.create(car);
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      return await Cars.findAll({
        include: [
          {
            model: Users
          }
        ]
       });
    } catch (error) {
      throw error;
    }
  }

  static async getOne(param) {
    try {
      console.log('Param === ', param);
      return await Cars.findOne({ 
        where: param, 
        include: [
          {
            model: Users
          }
        ]
       });
    } catch (error) {
      throw error;
    }
  }

  static async updateCar(param, newCar) {
    try {
      let result = await Cars.update(newCar, {
        returning: true,
        where: param
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
  static async deleteCar(param) {
    try {
      return await Cars.destroy({ where: param });
    } catch (error) {
      throw error;
    }
  }
}

export default CarService;
