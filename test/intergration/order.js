import "@babel/polyfill";
import chai from "chai";
import chaiHttp from "chai-http";
import assert from "assert";

const expect = chai.expect;

chai.use(chaiHttp);
const url = "http://localhost:3000/api/v1";
const requester = chai.request.agent(url);

import index from "../../index";
import app from "../../app";

describe("Testing Orders Enpoints", () => {
  let buyerToken = "";

  let sellerToken = "";

  let carId = "";

  let userId = "";

  let orderId = "";

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
        userId = res.body.data[0].id;
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
        buyerToken = res.body.data[0].token;

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
        userId = res.body.data[0].id;
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
        sellerToken = res.body.data[0].token;

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

        carId = res.body.data[0].id;

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

        orderId = res.body.data[0].id;
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

  it("Failes to create Order. Invalid Car Id", done => {
    let orderObject = {
      car: "1232",
      amount: 150000
    };

    requester
      .post("/order")
      .set("Authorization", buyerToken)
      .send(orderObject)
      .end((err, res) => {
        expect(res).to.have.status(404);
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

  it("Buyer Updates Order Price", done => {
    const data = {
      amount: 12500
    };
    requester
      .patch("/order/" + orderId + "/price")
      .set("Authorization", buyerToken)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Seller Updates Order Status", done => {
    const data = {
      status: "accepted"
    };
    requester
      .patch("/order/" + orderId + "/status")
      .set("Authorization", sellerToken)
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
      .set("Authorization", buyerToken)
      .send(data)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("Gets All Orders", done => {
    requester
      .get("/order")
      .set("Authorization", buyerToken)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
