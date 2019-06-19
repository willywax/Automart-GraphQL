const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);
const url = "http://localhost:3000/api/v1";
const requester = chai.request.agent(url);

const index = require("../../index");
const app = require("../../app");

describe("Testing Cars Enpoints", () => {
  let token = "";

  let carId = "";

  let userId = "";

  before("Creates User", done => {
    let userDetails = {
      email: "admin@automart.com",
      password: "admin",
      firstName: "firstName",
      lastName: "lastName",
      address: "144 Posta"
    };
    requester
      .post("/auth/signup")
      .send(userDetails)
      .end((err, res) => {
        expect(res).to.have.status(201);
        userId = res.body.data.id;
        done();
      });
  });

  before("Authenticates User", done => {
    /**Authenticates User First */
    let userDetails = {
      email: "admin@automart.com",
      password: "admin"
    };
    requester
      .post("/auth/signin")
      .send(userDetails)
      .end((err, res) => {
        token = res.body.data.token;

        console.log("User Signed IN: " + token);

        done();
      });
  });

  it("Fails to create car if not authenticated", done => {
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
  it("Creates car as authenticated User", done => {
    console.log("TOKEN " + token);
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
      .set("Authorization", token)
      .send(carObject)
      .end((err, res) => {
        expect(res).to.have.status(201);

        carId = res.body.data.id;

        done();
      });
  });

  it("Fails to create car if any of the fields are missing", done => {
    console.log("TOKEN " + token);
    let carObject = {
      state: "used",
      price: 56000,
      manufacturer: "Jeep",
      model: "Gladiator"
    };

    requester
      .post("/car")
      .set("Authorization", token)
      .send(carObject)
      .end((err, res) => {
        expect(res).to.have.status(422);

        done();
      });
  });
});
