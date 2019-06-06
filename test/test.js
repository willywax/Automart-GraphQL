const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const { expect } = chai;

const url = "http://localhost:3000";
const requester = chai.request.agent(url);

const index = require("../index");
const app = require("../app");

const User = require("../models/users");
const Car = require("../models/cars");

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
        .post("/api/v1/auth/signup")
        .send(person)
        .end((err, res) => {
          expect(res).to.have.status(201);
          done();
        });
    });
  });

  describe("Cars Model", () => {
    let car = new Car("123123", "used", 20000, "Toyota", "Brevis", "car");

    it("saves Car", () => {
      let result = Car.saveCar(car);

      assert.equal(car.price, result.price);
    });
    it("Checks return cars array", () => {
      let results = Car.getCars();
      let lastCar = results[results.length - 1];

      //Compares the last car in the array to the car last entered
      assert.equal(car.price, lastCar.price);
    });

    it("Returns Car from list of cars", () => {
      let result = Car.findOne(car.id);

      assert.notEqual(result, null);
    });

    it("Should return null car not found", () => {
      let newCar = new Car("123123", "used", 20000, "Benz", "C-Class", "car");

      let result = Car.findOne(newCar.id);

      assert.equal(result, null);
    });

    it("Should update car successfully", () => {
      car.price = 25000;
      let result = Car.updateOne(car);

      assert.equal(result.price, 25000);
    });

    it("Should search car successfully by price range", () => {
      let query = {
        min_price: 10000,
        max_price: 30000
      };

      let result = Car.searchCar(query);

      assert.notEqual(result.length, 0);
    });

    it("Should return null of wrong queries", () => {
      //Make is a wrong query
      let query = {
        make: "Benz"
      };

      let result = Car.searchCar(query);

      assert.equal(result.length, 0);
    });

    it("Should filter by either manufacturer, model or year if car exists", () => {
      //Make is a wrong query
      let query = {
        manufacturer: "Benz"
      };

      let result = Car.searchCar(query);

      assert.notEqual(result.length, 0);
    });

    it("Should delete Car successfully", () => {
      let result = Car.deleteOne(car);

      let found = Car.findOne(car.id);

      assert.equal(found, null);
    });
  });
});
