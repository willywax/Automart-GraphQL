const User = require("./users");
const Car = require("./cars");
const Order = require("./orders");

exports.populateData = () => {
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

  //Creating a super User
  admin.is_admin = true;

  User.saveUser(admin);
  User.saveUser(buyer);
  User.saveUser(seller);

  const car = new Car(seller.id, "used", 5000, "Benz", "C-Class", "car");

  const car2 = new Car(seller.id, "new", 150000, "VW", "Amarok", "pick-up");
  const car3 = new Car(seller.id, "new", 165000, "BMW", "X6", "car");

  Car.saveCar(car);
  Car.saveCar(car2);
  Car.saveCar(car3);

  const order = new Order(buyer.id, car.id, 15000);

  Order.saveOrder(order);
};
