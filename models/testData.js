const User = require("./users");
const Car = require("./cars");
const Order = require("./orders");

const admin = {
  id: 123100100,
  firstName: "Admin",
  lastName: "Admin",
  password: "admin",
  email: "admin@automart.com",
  address: "Admin Address",
  is_admin: true
};

const seller = {
  id: 123100101,
  firstName: "Seller",
  lastName: "Seller",
  password: "123123",
  email: "seller@automart.com",
  is_admin: false
};

const buyer = {
  id: 123100102,
  firstName: "Buyer",
  lastName: "Buyer",
  password: "123123",
  email: "buyer@automart.com",
  is_admin: false
};

const car1 = {
  id: 123200100,
  owner: 123100101,
  state: "new",
  status: "available",
  price: 15000,
  manufacturer: "Benz",
  model: "C-Class",
  body_type: "car"
};

const car2 = {
  id: 123200101,
  owner: 123100101,
  state: "used",
  status: "used",
  price: 25000,
  manufacturer: "VW",
  model: "Amarok",
  body_type: "pick-up"
};

const car3 = {
  id: 123200102,
  owner: 123100101,
  state: "used",
  status: "available",
  price: 35000,
  manufacturer: "BMW",
  model: "X-6",
  body_type: "SUV"
};

const order1 = {
  id: 123300100,
  car: 123200102,
  buyer: 123100102,
  status: "pending",
  price_offered: 40000
};

exports.exports.populateData = () => {
  //Adding Users to UserCollection
  User.saveUser(admin);
  User.saveUser(buyer);
  User.saveUser(seller);

  //Adding Cars to CarCollection
  Car.saveCar(car1);
  Car.saveCar(car2);
  Car.saveCar(car3);

  //Adding Order to Collection
  Order.saveOrder(order);
};

/** Methods For Exposing the created data */
exports.data = {
  users: [admin, seller, buyer],
  cars: [car1, car2, car3],
  orders: [order1]
};
