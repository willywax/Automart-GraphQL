import express from "express";
import { checks, validationResults } from "../middlewares/validatator";

import userController from "../controllers/users";
export const userRouter = express.Router();

userRouter.post(
  "/signup",
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
