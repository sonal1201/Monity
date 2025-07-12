import express from "express";
import v1Router from "./routes";

const app = express();

app.use(express.json());

app.use("/api/v1", v1Router);

app.get("/", (req, res) => {
  res.json({
    message: "hLELOO",
  });
});

app.listen(3000);
