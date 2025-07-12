import express from "express";
import { addWebsite, websiteStatus } from "../controller/website-controller";
import { authMiddleware } from "../middleware/auth_middleware";

const websiteRouter = express.Router();

websiteRouter.post("/", authMiddleware, addWebsite);
websiteRouter.get("/status/:websiteid", authMiddleware, websiteStatus);

export default websiteRouter;
