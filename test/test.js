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
// const userController = require('../controllers/users');

describe("Model Tests", () => {
  describe("User Model", () => {
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
});
