import express from "express";
import morgan from "morgan";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import connection from "./utils/connection";
import userRouter from "./user/user.router";
import { config } from "./config/dev";
const app = express();
require("dotenv").config();
const port = 8000;
app.use(morgan("dev"));
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use("/user", userRouter);
connection(config.dbURL)
  .then(() => {
    app.listen(port, () => {
      console.log("Server up on port 4000");
    });
  })
  .catch((e) => console.error(e));
