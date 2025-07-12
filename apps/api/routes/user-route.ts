import express from "express";
import { registerUser, signinUser } from "../controller/user-controller";

const userRouter = express.Router();

userRouter.post("/signup", registerUser);
userRouter.post("/signin", signinUser);

export default userRouter;
