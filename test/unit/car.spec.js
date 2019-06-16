const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const assert = require("assert");

chai.use(chaiHttp);

const index = require("../../index");
const app = require("../../app");

const Order = require("../../models/orders");
const testData = require("../../models/testData");

describe("Testing Car Model", () => {
  let order;
  before("Create Order ", () => {
    order = new Order(testData.data.cars[0], testData.data.users[2], 12000);
  });
});
