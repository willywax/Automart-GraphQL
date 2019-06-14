const User = require("./users");
const Car = require("./cars");
const Order = require("./orders");

const admin = new User(
  "Admin",
  "Admin",
  "admin",
  "admin@automart.com",
  "144 Peter Road",
  true
);
const seller = new User(
  "Seller",
  "Colgate",
  "123123",
  "seller@stations.com",
  "144 Peter Road",
  false
);

const buyer = new User(
  "Buyer",
  "Zima",
  "123123",
  "buyer@stations.com",
  "144 Peter Road",
  false
);

const car1 = new Car(seller.id, "used", 5000, "Benz", "C-Class", "car");

const car2 = new Car(seller.id, "new", 150000, "VW", "Amarok", "pick-up");
const car3 = new Car(seller.id, "new", 165000, "BMW", "X6", "car");

exports.populateData = () => {
  //Creating a super User
  admin.is_admin = true;

  User.saveUser(admin);
  User.saveUser(buyer);
  User.saveUser(seller);

  Car.saveCar(car1);
  Car.saveCar(car2);
  Car.saveCar(car3);

  const order = new Order(buyer.id, car1.id, 15000);

  Order.saveOrder(order);
};

/** Methods For Test Sets */
exports.data = {
  users: {
    admintoken: "",
    sellerToken: "",
    buyerToken: "",
    cars: [car1, car2, car3]
  }
};

exports.createToken = () => {
  let admin = getToken({
    email: "admin@automart.com",
    password: "admin"
  });

  let seller = getToken({
    email: "seller@stations.com",
    password: "123123"
  });

  this.data.users.admintoken = admin;

  this.data.users.sellerToken = seller;

  //return token;
};
function getToken(user) {
  let response = User.logInUser(user);

  return response.data.token;
}
