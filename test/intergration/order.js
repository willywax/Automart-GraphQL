const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);
const url = "http://localhost:3000/api/v1";
const requester = chai.request.agent(url);

const index = require("../../index");
const app = require("../../app");

describe("Testing Orders Enpoints", () => {
  let buyerToken = "";

  let sellerToken = "";

  let carId = "";

  let userId = "";

  before("Creates Buyer", done => {
    let userDetails = {
      email: "buyer@automart.com",
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

  before("Authenticates Buyer", done => {
    /**Authenticates User First */
    let userDetails = {
      email: "buyer@automart.com",
      password: "admin"
    };
    requester
      .post("/auth/signin")
      .send(userDetails)
      .end((err, res) => {
        buyerToken = res.body.data.token;

        done();
      });
  });

  before("Creates Seller", done => {
    let userDetails = {
      email: "seller@automart.com",
      password: "admin",
      firstName: "Seller",
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

  before("Authenticates Seller", done => {
    /**Authenticates User First */
    let userDetails = {
      email: "seller@automart.com",
      password: "admin"
    };
    requester
      .post("/auth/signin")
      .send(userDetails)
      .end((err, res) => {
        sellerToken = res.body.data.token;

        done();
      });
  });

  before("Creates car as with Seller Token User", done => {
    let carObject = {
      state: "new",
      price: 126000,
      manufacturer: "Benz",
      model: "S-Class",
      body_type: "car",
      status: "available"
    };

    requester
      .post("/car")
      .set("Authorization", sellerToken)
      .send(carObject)
      .end((err, res) => {
        expect(res).to.have.status(201);

        carId = res.body.data.id;

        done();
      });
  });

  it("Buyer Creates Order successfully", done => {
    let orderObject = {
      car: carId,
      amount: 150000
    };

    requester
      .post("/order")
      .set("Authorization", buyerToken)
      .send(orderObject)
      .end((err, res) => {
        expect(res).to.have.status(201);

        orderId = res.body.data.id;
        done();
      });
  });
  it("Failes to create Order. Buyer can't buy own car", done => {
    let orderObject = {
      car: carId,
      amount: 150000
    };

    requester
      .post("/order")
      .set("Authorization", sellerToken)
      .send(orderObject)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
