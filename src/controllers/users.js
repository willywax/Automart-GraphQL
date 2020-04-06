import UserService from "../services/users_service";
import Response from "../utils/response";
import { generateToken, removeKeys, encrypt, decrypt } from "../utils/helper";

class UserController {
  async signUp(args, req) {
    try {
      let { email, password } = args;
      let foundUser = await UserService.findUser({ email });
      if (foundUser) throw new Error("User already exists");

      args.password = encrypt(password);

      let newUser = await UserService.saveUser(args);

      newUser.dataValues.token = generateToken(newUser);

      return newUser.dataValues;
    } catch (error) {
      return error;
    }
  }
  async login(args, req) {
    try {

      const { email, password } = args;
      let foundUser = await UserService.findUser({ email });
      
      if (!foundUser) throw new Error('User does not exist')
      
      console.log('Found User ', foundUser.password);
      console.log('Password ', password);
      let authenticated = decrypt(foundUser.password, password);
      
      if (!authenticated)  throw new Error('Incorret email or password')
      
      foundUser.dataValues.token = generateToken(foundUser);

      return foundUser.dataValues;
    } catch (error) {
      throw error;
     
    }
  }
}

export default new UserController();
