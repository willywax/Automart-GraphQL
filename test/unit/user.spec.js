const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const assert = require("assert");

chai.use(chaiHttp);
const url = "http://localhost:3000/api/v1";
const requester = chai.request.agent(url);

const index = require("../../index");
const app = require("../../app");

const User = require("../../models/users");
const testData = require("../../models/testData");

describe("Testing Users Enpoints", () => {
  it("Get All users ", () => {
    const users = User.getUsers();

    expect(users.length).greaterThan(0);
  });

  it("Returns user by Id", () => {
    const user_id = testData.data.users[0].id;

    const user = User.findUserById(user_id);

    expect(user.id).is.equal(user_id);
  });

  it("Returns null for invalid Id", () => {
    const user_id = "123123";

    const user = User.findUserById(user_id);

    expect(user).is.equal(null);
  });

  it("should return false if wrong username is given", () => {
    const person3 = {
      email: "w@station.com",
      password: "12313"
    };
    let results = User.logInUser(person3);

    assert.equal(results.authenticated, false);
  });
});
