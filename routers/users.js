import express from "express";
import { checks, validationResults } from "../middlewares/validatator";
import { users, admin } from "../middlewares/setup";
import userController from "../controllers/users";
import { createAdmin } from "../controllers/admin";

export const userRouter = express.Router();

userRouter.post(
  "/signup",
  users,
  checks.singUpCheck,
  validationResults,
  userController.signUp
);
userRouter.post(
  "/signin",
  checks.singInCheck,
  validationResults,
  userController.login
);

userRouter.post(
  "/setup",
  admin,
  checks.checkAdmin,
  validationResults,
  createAdmin
);
