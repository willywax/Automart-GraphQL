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

describe("Testing Flag Enpoints", () => {
  it("should flag a car", done => {
    const flag = {
      car: testData.data.cars[0],
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
