const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const { expect } = chai;

const url = "http://localhost:3000/api/v1";
const requester = chai.request.agent(url);

const index = require("../index");
const app = require("../app");

const User = require("../models/users");
const Car = require("../models/cars");
const Order = require("../models/orders");

//const data = require('../models/testData');
// const userController = require('../controllers/users');

describe("Model Tests", () => {
  const person = new User(
    "William",
    "William",
    "123123",
    "w@stations.com",
    "144 Peter Road",
    false
  );

  const person2 = new User(
    "Manka",
    "Zimazile",
    "123123",
    "zima@station.com",
    "144 Peter Road",
    false
  );

  let car = new Car(person.id, "used", 20000, "Toyota", "Brevis", "car");
  let car2 = new Car(person.id, "used", 20000, "Toyota", "Brevis", "car");

  let order = new Order(person2.id, car.id, 15000);

  describe("User Model", () => {
    it("should save user successfully", () => {
      User.saveUser(person);

      assert.notEqual(User.getUsers().length, 0);
    });

    it("should return id", () => {
      assert.notEqual(person.id, null);
    });

    it("should return correct First Name", () => {
      assert.equal(person.first_name, "William");
    });

    it("should return correct Last Name", () => {
      assert.equal(person.last_name, "William");
    });

    it("should return correct Address", () => {
      assert.equal(person.address, "144 Peter Road");
    });

    it("should return correct Email", () => {
      assert.equal(person.email, "w@stations.com");
    });

    it("should return true if correct user name and password", () => {
      const person2 = {
        email: "w@stations.com",
        password: "123123"
      };
      assert.equal(User.logInUser(person2).authenticated, true);
    });

    it("should return false if wrong password", () => {
      const person3 = {
        email: "w@stations.com",
        password: "12312"
      };
      assert.equal(User.logInUser(person3).authenticated, false);
    });

    it("should return false if wrong username is given", () => {
      const person3 = {
        email: "w@station.com",
        password: "12313"
      };
      assert.equal(User.logInUser(person, person3).authenticated, false);
    });

    it("should return a user", () => {
      const response = User.findUser(person);

      assert.notEqual(response, null);
    });

    it("should return null user doesnt exists", () => {
      const response = User.findUser(person2);

      assert.equal(response, null);
    });
  });

  describe("User Controller", () => {
    const person = {
      firstName: "William",
      lastName: "Max",
      password: "123123",
      email: "register@station.com",
      address: "144 Peter Road",
      isAdmin: false
    };

    it("Verifies Users is registed successfully", done => {
      requester
        .post("/auth/signup")
        .send(person)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it("Logins user with correct credentials", done => {
      const login = {
        email: "register@station.com",
        password: "123123"
      };

      requester
        .post("/auth/signin")
        .send(login)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it("Logins user with Incorrect credentials", done => {
      const login = {
        email: "registe@station.com",
        password: "12312"
      };

      requester
        .post("/auth/signin")
        .send(login)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe("Cars Model", () => {
    it("saves Car", () => {
      let result = Car.saveCar(car);

      assert.equal(car.price, result.price);
    });

    it("Saves Car using Controller", done => {
      let carObject = {
        owner: person.id,
        state: "used",
        price: 56000,
        manufacturer: "Jeep",
        model: "Gladiator",
        body_type: "Pick Up"
      };

      requester
        .post("/car")
        .send(carObject)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    /** Failed  */
    it("Should update Car price Successfully", done => {
      let price = {
        price: 12000
      };
      requester
        .patch("/car/" + car.id + "/price")
        .set("Authorization", dataSet.data.users.sellerToken)
        .send(price)
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });

    /*** 401 Error */
    it("Should update Car price Successfully", done => {
      let price = {
        price: 12000
      };

      requester
        .patch("/car/" + car.id + "/price")
        .send(price)
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });

    it("Update Price Fails if wrong car Id", done => {
      let price = {
        price: 12000
      };

      requester
        .patch("/car/123123/price")
        .send(price)
        .end((err, res) => {
          expect(res).to.have.status(404);

          done();
        });
    });

    it("Should update Car Status Successfully", done => {
      let status = {
        status: "sold"
      };

      requester
        .patch("/car/" + car.id + "/status")
        .send(status)
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });

    it("Update Status Fails if wrong car Id", done => {
      let status = {
        status: "sold"
      };

      requester
        .patch("/car/123123/status")
        .send(status)
        .end((err, res) => {
          expect(res).to.have.status(404);

          done();
        });
    });

    it("Should delete Car successfully", done => {
      requester
        .delete("/car/" + car.id)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });

    it("Should fail to delete Car", done => {
      requester
        .delete("/car/" + car.id)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);

          done();
        });
    });
  });

  describe("Orders Model", () => {
    it("Saves order successfully", done => {
      Car.saveCar(car2);

      let orderObject = {
        buyer: person.id,
        car: car2.id,
        amount: 150000
      };

      requester
        .post("/order")
        .send(orderObject)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });

    it("Save Order through Model", () => {
      let result = Order.saveOrder(order);

      assert(result.car_id, order.car_id);
    });

    it("Finds the Order by Id", () => {
      let result = Order.findById(order.id);

      assert.equal(order.car, result.car);
    });

    it("Gets All Orders", done => {
      requester
        .get("/order")
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it("Updates Order Price", done => {
      const data = {
        amount: 12500
      };
      requester
        .patch("/order/" + order.id + "/price")
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });

    it("Returns error to update wrong Id", done => {
      const data = {
        amount: 15500
      };
      requester
        .patch("/order/120/price")
        .send(data)
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe("Flags Model", () => {
    it("should flag a car", done => {
      const flag = {
        car: car.id,
        reason: "Wrong Car",
        description: "Car doesnot match details"
      };

      requester
        .post("/flag")
        .send(flag)
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });

    it("Should return all flags", done => {
      requester
        .get("/flag")
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });
  });
});
