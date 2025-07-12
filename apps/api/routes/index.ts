import express from "express";
import userRouter from "./user-route";
import websiteRouter from "./website-route";
const v1Router = express.Router();

v1Router.use("/user", userRouter);
v1Router.use("/website", websiteRouter);

export default v1Router;
