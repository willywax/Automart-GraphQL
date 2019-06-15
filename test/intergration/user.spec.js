const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);
const url = "http://localhost:3000/api/v1";
const requester = chai.request.agent(url);

const index = require("../../index");
const app = require("../../app");

describe("Testing Cars Enpoints", () => {
  it("Register User User", done => {
    let userDetails = {
      email: "test@automart.com",
      password: "123123",
      firstName: "firstName",
      lastName: "lastName",
      address: "144 Posta"
    };
    requester
      .post("/auth/signup")
      .send(userDetails)
      .end((err, res) => {
        expect(res).to.have.status(201);

        done();
      });
  });

  it("Fails to Register Users with duplicate email", done => {
    let userDetails = {
      email: "test@automart.com",
      password: "123123",
      firstName: "firstName",
      lastName: "lastName",
      address: "144 Posta"
    };
    requester
      .post("/auth/signup")
      .send(userDetails)
      .end((err, res) => {
        expect(res).to.have.status(422);

        done();
      });
  });

  it("Logins User", done => {
    let userDetails = {
      email: "admin@automart.com",
      password: "admin"
    };
    requester
      .post("/auth/signin")
      .send(userDetails)
      .end((err, res) => {
        expect(res).to.have.status(200);

        done();
      });
  });

  it("Fails to Authenticate User with incorrect credentials", done => {
    let userDetails = {
      email: "admin@automart.com",
      password: "cool"
    };
    requester
      .post("/auth/signin")
      .send(userDetails)
      .end((err, res) => {
        expect(res).to.have.status(401);

        done();
      });
  });
});
