const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const { expect } = chai;

const should = chai.should();

const url = "http://localhost:3000/api/v1";
const requester = chai.request.agent(url);

const index = require("../index");
const app = require("../app");
const auth = require("../middlewares/authentication");

const User = require("../models/users");
const Car = require("../models/cars");
const Order = require("../models/orders");

const dataSet = require("../models/testData");

const orderController = require("../controllers/orders");

dataSet.createToken(); //Creates Auth Token
describe("Model Tests", () => {
  const person = new User(
    "William",
    "William",
    "123123",
    "w@stations.com",
    "144 Peter Road"
  );

  const person2 = new User(
    "Manka",
    "Zimazile",
    "123123",
    "zima@station.com",
    "144 Peter Road"
  );

  let car = new Car(person.id, "used", 20000, "Toyota", "Brevis", "car");
  let car2 = new Car(person.id, "used", 20000, "Toyota", "Brevis", "car");

  let order = new Order(person2.id, car.id, 15000);

  describe("User Controller", () => {
    const person = {
      firstName: "William",
      lastName: "Max",
      password: "123123",
      email: "register@station.com",
      address: "144 Peter Road"
    };

    it("Verifies Users is registed successfully", done => {
      requester
        .post("/auth/signup")
        .send(person)
        .end((err, res) => {
          res.body.should.include.keys("data");
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

    it("Logins user with Incorrect Email", done => {
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

    it("Logins user with Incorrect Password", done => {
      const login = {
        email: "admin@automart.com",
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
        state: "used",
        price: 56000,
        manufacturer: "Jeep",
        model: "Gladiator",
        body_type: "Pick Up",
        status: "available"
      };

      requester
        .post("/car")
        .send(carObject)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it("Returns Car from list of cars", () => {
      requester
        .get("/car/" + car.id)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
    });

    it("Should return null car not found", () => {
      requester
        .get("/car/123")
        .send()
        .end((err, res) => {
          expect(res).to.have.status(404);
        });
    });

    it("Should search car successfully by price range", done => {
      requester
        .get("/car?min_price=10000&max_price=30000")
        .send()
        .end((err, res) => {
          let data = res.data;
          assert.notEqual(data, 0);

          done();
        });
    });

    it("Should return null of wrong queries", done => {
      //Make is a wrong query
      requester
        .get("/car?make=Toyota")
        .send()
        .end((err, res) => {
          expect(res.body.data.length).equal(0);

          done();
        });
    });

    it("Should filter by either manufacturer, model or year if car exists", done => {
      requester
        .get("/car?manufacturer=Benz")
        .send()
        .end((err, res) => {
          let data = res.body.data;
          //console.log(data);
          assert.notEqual(data.length, 0);

          done();
        });
    });
  });

  describe("Orders Model", () => {
    it("Save Order through Model", () => {
      let result = Order.saveOrder(order);

      assert(result.car_id, order.car_id);
    });

    it("Finds the Order by Id", () => {
      let result = Order.findById(order.id);

      assert.equal(order.car, result.car);
    });

    it("Get Orders by UserId", () => {
      let orders = Order.getOrdersByUser(person2.id);

      assert.equal(orders.length, 1);
    });

    it("Get All Orders", () => {
      let orders = Order.getOrders();

      expect(orders.length).greaterThan(0);
    });

    it("Update Order Successfully", () => {
      order.status = "pending";
      let result = Order.updateOrder(order);

      assert.equal(order.status, result.status);
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
