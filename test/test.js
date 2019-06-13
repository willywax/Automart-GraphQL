const assert = require("assert");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const { expect } = chai;

const url = "http://localhost:3000/api/v1";
const requester = chai.request.agent(url);

const index = require("../index");
const app = require("../app");

const User = require("../models/users");
const Car = require("../models/cars");
const Order = require("../models/orders");

//const data = require('../models/testData');
// const userController = require('../controllers/users');

describe("Model Tests", () => {
  describe("Authentication Test", () => {
    it("A registered User should In successfully with correct token", done => {});

    it("A registered User should get the orders they created", done => {});

    it("A users should be able to update price of their purchase order", done => {});

    it("Registered User should be able to post car Ad", done => {});

    it("A user can update the status of the Ad they posted", done => {});

    it("Registered User can flag any Ad as Fradulent", done => {});

    it("Anonymous User can not flag Ads", done => {});

    it("Any registered User can see a specific car", done => {});

    it("Admin can delete any car", done => {});

    it("User can delete only their ads", done => {});
  });
});
