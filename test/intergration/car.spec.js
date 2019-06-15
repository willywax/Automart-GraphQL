const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const assert = require("assert");

chai.use(chaiHttp);
const url = "http://localhost:3000/api/v1";
const requester = chai.request.agent(url);

const index = require("../../index");
const app = require("../../app");

const testData = require("../../models/testData");

describe("Testing Cars Enpoints", () => {
  let token = "";

  let carId = "";

  before("Authenticate User", done => {
    let userDetails = {
      email: "admin@automart.com",
      password: "admin"
    };
    requester
      .post("/auth/signin")
      .send(userDetails)
      .end((err, res) => {
        token = res.body.data.token;

        expect(res).to.have.status(200);

        done();
      });
  });

  it("Creates car as authenticated User", done => {
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

  it("Get Cars", done => {
    requester
      .get("/car")
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data.length).greaterThan(0);

        done();
      });
  });

  it("Get Car By Id", done => {
    requester
      .get("/car/" + carId)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);

        done();
      });
  });

  it("Gets Cars by user", done => {
    requester
      .get("/car/user/" + testData.data.users[0])
      .set("Authorization", token)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);

        done();
      });
  });

  it("Returns Car from list of cars", done => {
    requester
      .get("/car")
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);

        done();
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

        assert.notEqual(data.length, 0);

        done();
      });
  });

  it("Should update Car price Successfully", done => {
    let price = {
      price: 12000
    };

    requester
      .patch("/car/" + carId + "/price")
      .set("Authorization", token)
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
      .set("Authorization", token)
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
      .patch("/car/" + carId + "/status")
      .set("Authorization", token)
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
      .set("Authorization", token)
      .send(status)
      .end((err, res) => {
        expect(res).to.have.status(404);

        done();
      });
  });

  it("Should delete Car successfully", done => {
    requester
      .delete("/car/" + carId)
      .set("Authorization", token)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);

        done();
      });
  });

  it("Should fail to delete Car", done => {
    requester
      .delete("/car/" + carId)
      .set("Authorization", token)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(404);

        done();
      });
  });
});
