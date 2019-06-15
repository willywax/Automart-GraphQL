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

describe("Testing Orders Enpoints", () => {
  let token = "";

  let buyerToken = "";

  let orderId = "";

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

  it("Saves order successfully", done => {
    let orderObject = {
      car: testData.data.cars[0].id,
      amount: 150000
    };

    requester
      .post("/order")
      .set("Authorization", token)
      .send(orderObject)
      .end((err, res) => {
        expect(res).to.have.status(201);

        orderId = res.body.data.id;
        done();
      });
  });

  it("Fails to Saves order Invalid car Id", done => {
    let orderObject = {
      car: "123123",
      amount: 150000
    };

    requester
      .post("/order")
      .set("Authorization", token)
      .send(orderObject)
      .end((err, res) => {
        expect(res).to.have.status(422);

        done();
      });
  });

  it("Gets All Orders", done => {
    requester
      .get("/order")
      .set("Authorization", token)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Fails to get Order due to Invalid Token", done => {
    requester
      .get("/order")
      .set("Authorization", "Invalid Token")
      .send()
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it("Updates Order Price", done => {
    const data = {
      amount: 12500
    };
    requester
      .patch("/order/" + testData.data.orders[0].id + "/price")
      .set("Authorization", token)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Updates Order Status", done => {
    const data = {
      status: "accepted"
    };
    requester
      .patch("/order/" + testData.data.orders[0].id + "/status")
      .set("Authorization", token)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Returns error to update price of wrong Id", done => {
    const data = {
      amount: 15500
    };
    requester
      .patch("/order/120/price")
      .set("Authorization", token)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("Returns error to update price of wrong Id", done => {
    const data = {
      status: "accepted"
    };
    requester
      .patch("/order/120/status")
      .set("Authorization", token)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  describe("Orders made using authenticated User", () => {
    let token = "";

    before("Authenticate Buyer", done => {
      let userDetails = {
        email: "seller@automart.com",
        password: "123123"
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

    it("Saves order Fails. Cant create order for own car", done => {
      let orderObject = {
        car: testData.data.cars[0].id,
        amount: 150000
      };

      requester
        .post("/order")
        .set("Authorization", token)
        .send(orderObject)
        .end((err, res) => {
          expect(res).to.have.status(404);

          done();
        });
    });

    it("Gets All Orders By Seller", done => {
      requester
        .get("/order")
        .set("Authorization", token)
        .send()
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
