import express from "express";
import morgan from "morgan";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import connection from "./utils/connection";
import userRouter from "./user/user.router";
const app = express();
require("dotenv").config();
const port = 4000;
app.use(morgan("dev"));
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use("/user", userRouter);
connection(process.env.DB_ACCESS)
  .then(() => {
    app.listen(port, () => {
      console.log("Server up on port 4000");
    });
  })
  .catch((e) => console.error(e));
