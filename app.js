const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");

const swaggerDocument = require("./swagger.json");

const app = express();

const userRouter = require("./routers/users");
const carRouter = require("./routers/cars");
const orderRouter = require("./routers/orders");
const flagRouter = require("./routers/flags");

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
app.use("/api/v1/flag", flagRouter);

module.exports = app;
