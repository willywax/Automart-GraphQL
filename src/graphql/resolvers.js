import userController from '../controllers/users';
import carController from '../controllers/cars';


// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
      return 'Hello world!';
    },
    createUser: userController.signUp,
    loginUser: userController.login,
    saveCar: carController.saveCar,
    updateCar: carController.updateCar,
    getOneCar: carController.getOneCar,
    getCars: carController.getCars,
    deleteCar: carController.deleteCar
  };

export default root;