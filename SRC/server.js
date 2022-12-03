import express from "express";
import morgan from "morgan";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import connection from "./utils/connection";
import userRouter from "./user/user.router";
import { config } from "./config/dev";
import { protect, signin, signup } from "./utils/auth";
import User from "./user/usermodel";
import errorHandler from "./errorHandler";
const app = express();
app.disable("x-powered-by");
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
require("dotenv").config();
const port = 8000;
app.use(morgan("dev"));
app.post("/api/signup", signup);
app.post("/api/signin", signin);
app.use("/api/user", userRouter);
app.use(errorHandler);
app.use("/api", protect);

// const userDB = connection(config.userDB).then(() =>
//   console.log("connected to users db")
// );

connection(config.userDB)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server up on port ${port}`);
      User.syncIndexes();
      User.collection.getIndexes({ full: true }).then((indexes) => {
        console.log(indexes);
      });
    });
  })
  .catch((e) => console.error(e));
