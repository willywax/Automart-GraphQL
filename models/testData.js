const User = require("./users");
const Car = require("./cars");
const Order = require("./orders");

exports.populateData = () => {
  const seller = new User(
    "William",
    "William",
    "123123",
    "w@stations.com",
    "144 Peter Road",
    true
  );
  const seller2 = new User(
    "Nyambuks",
    "Colgate",
    "123123",
    "n@stations.com",
    "144 Peter Road",
    false
  );

  const buyer = new User(
    "Manka",
    "Zima",
    "123123",
    "buyer@station.com",
    "144 Peter Road",
    false
  );

  //Creating a super User
  seller.is_admin = true;

  User.saveUser(seller);
  User.saveUser(buyer);
  User.saveUser(seller2);

  const car = new Car(seller.id, "used", 5000, "Benz", "C-Class", "car");

  const car2 = new Car(seller2.id, "new", 150000, "VW", "Amarok", "pick-up");
  const car3 = new Car(seller2.id, "new", 165000, "BMW", "X6", "car");

  Car.saveCar(car);
  Car.saveCar(car2);
  Car.saveCar(car3);

  const order = new Order(buyer.id, car.id, 15000);

  Order.saveOrder(order);
};
