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

describe("Testing Cars Enpoints", () => {
  let token = "";

  let carId = "";

  let userId = "";

  let adminToken = "";

  before("Creates User", done => {
    let userDetails = {
      email: "user1@automart.com",
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

        console.log("User Id" + userId);
        done();
      });
  });

  before("Authenticates Admin", done => {
    /**Authenticates User First */
    let userDetails = {
      email: "admin@automart.com",
      password: "adminadmin"
    };
    requester
      .post("/auth/signin")
      .send(userDetails)
      .end((err, res) => {
        adminToken = res.body.data[0].token;

        done();
      });
  });

  before("Authenticates User", done => {
    /**Authenticates User First */
    let userDetails = {
      email: "user1@automart.com",
      password: "admin"
    };
    requester
      .post("/auth/signin")
      .send(userDetails)
      .end((err, res) => {
        token = res.body.data[0].token;
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
    let carObject = {
      state: "new",
      price: 55000,
      manufacturer: "Jeep",
      model: "Gladiator",
      body_type: "Pick Up",
      status: "available"
    };
    console.log("token " + token);

    requester
      .post("/car")
      .set("Authorization", token)
      .send(carObject)
      .end((err, res) => {
        expect(res).to.have.status(201);

        carId = res.body.data[0].id;

        done();
      });
  });

  it("Fails to create car if any of the fields are missing", done => {
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

  it("Should get unsold cars ", done => {
    requester
      .get("/car?status=available")
      .send()
      .end((err, res) => {
        let data = res.body.data;
        assert.notEqual(data.length, 0);

        done();
      });
  });

  it("Should get unsold cars by using price range ", done => {
    requester
      .get("/car?status=available&min_price=50000&max_price=57000")
      .send()
      .end((err, res) => {
        let data = res.body.data;
        assert.equal(data.length, 1);

        done();
      });
  });

  it("Should filter by either manufacturer, model or year if car exists", done => {
    requester
      .get("/car?manufacturer=Jeep")
      .send()
      .end((err, res) => {
        let data = res.body.data;
        assert.equal(data.length, 1);

        done();
      });
  });

  it("Should return empty car not found when wrong car Id", done => {
    requester
      .get("/car/123")
      .send()
      .end((err, res) => {
        expect(res).to.have.status(404);

        done();
      });
  });

  it("Should Fail to filter if wrong query provided", done => {
    requester
      .get("/car?make=Jeep")
      .send()
      .end((err, res) => {
        let data = res.body.data;
        assert.equal(data.length, 0);
        expect(res).to.have.status(404);

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

  it("Should update Car price Successfully", done => {
    let amount = {
      price: 12000
    };

    requester
      .patch("/car/" + carId + "/price")
      .set("Authorization", token)
      .send(amount)
      .end((err, res) => {
        expect(res).to.have.status(200);

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

  it("Fail update Car Status or Price if wrong carId", done => {
    let status = {
      status: "sold"
    };

    requester
      .patch("/car/" + "123" + "/status")
      .set("Authorization", token)
      .send(status)
      .end((err, res) => {
        expect(res).to.have.status(404);

        done();
      });
  });

  it("Fail to delete Car if not admin", done => {
    requester
      .delete("/car/" + carId)
      .set("Authorization", token)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(401);

        done();
      });
  });
  it("Should delete Car successfully", done => {
    requester
      .delete("/car/" + carId)
      .set("Authorization", adminToken)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);

        done();
      });
  });

  it("Can not delete car with Invalid Id", done => {
    requester
      .delete("/car/" + carId)
      .set("Authorization", adminToken)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(404);

        done();
      });
  });
});
