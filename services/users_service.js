import sequelize from "sequelize";
import database from "../database/models";

const { Users } = database;

class UserService {
  static async saveUser(user) {
    try {
      return await Users.create(user);
    } catch (error) {
      throw error;
    }
  }

  static async findUser(param) {
    try {
      let users = await Users.findOne({ where: param });
      return users;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
