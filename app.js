"use strict";
import express from "express";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";

import swaggerDocument from "./swagger.json";

import { userRouter } from "./routers/users";
import { carRouter } from "./routers/cars";
import { orderRouter } from "./routers/orders";

import { getError } from "./utils/helper";

export const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );

  next();
});

app.use(express.static(`${__dirname}/UI`));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/car", carRouter);
app.use("/api/v1/order", orderRouter);
app.use("/", getError);
