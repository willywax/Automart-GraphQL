const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

const assert = require("assert");

chai.use(chaiHttp);

const index = require("../../index");
const app = require("../../app");

const Order = require("../../models/orders");
const testData = require("../../models/testData");

describe("Testing Order Enpoints", () => {
  let order;
  before("Create Order ", () => {
    order = new Order(testData.data.cars[0], testData.data.users[2], 12000);
  });

  it("Save Order through Model", () => {
    let result = Order.saveOrder(order);

    assert(result.car, order.car);
  });

  it("Finds the Order by Id", () => {
    let result = Order.findById(order.id);

    assert.equal(order.car, result.car);
  });

  it("Get Orders by UserId", () => {
    let orders = Order.getOrdersByUser(testData.data.users[2].id);

    expect(orders.length).greaterThan(0);
  });

  it("Get All Orders", () => {
    let orders = Order.getOrders();

    expect(orders.length).greaterThan(0);
  });

  it("Update Order Successfully", () => {
    order.status = "pending";
    let result = Order.updateOrder(order);

    assert.equal(order.status, result.status);
  });
});
