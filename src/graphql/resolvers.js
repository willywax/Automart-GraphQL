import userController from '../controllers/users';


// The root provides a resolver function for each API endpoint
const root = {
    hello: () => {
      return 'Hello world!';
    },
    createUser: userController.signUp,
    loginUser: userController.login
  };

export default root;