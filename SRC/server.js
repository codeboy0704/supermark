import express from "express";
import morgan from "morgan";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import connection from "./utils/connection";
const app = express();
require("dotenv").config();
const port = 4000;
app.use(morgan("dev"));
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use("/api/user", userRouter);
connection(process.env.DB_ACCESS)
  .then(() => {
    app.listen(port, () => {
      console.log("Hello There");
    });
  })
  .catch((e) => console.error(e));
