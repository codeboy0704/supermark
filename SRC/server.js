import express from "express";
import session from "express-session";
const MongoDBSession = require("connect-mongodb-session")(session);
import morgan from "morgan";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import userRouter from "./user/user.router";
import { config } from "./config/dev";
import { protect, signin, signup } from "./utils/auth";
import User from "./user/usermodel";
import errorHandler from "./errorHandler";
import { connect } from "mongoose";
import makeNewConnection from "./utils/connection";
const app = express();
const store = new MongoDBSession({
  uri: config.sessionDB,
  collection: "mySessions",
});
app.disable("x-powered-by");
app.use(
  cors({
    origin: ["http://127.0.0.1:5173/"],
    credentials: true,
  })
);
app.use(
  session({
    secret: "Key that will sign",
    resave: false, //for every req to the server we want to create a new session
    saveUninitialized: false,
    store: store,
  })
);

app.use(urlencoded({ extended: true }));
app.use(json());
require("dotenv").config();
const port = 8000;
app.use(morgan("dev"));
app.post("/api/signup", signup);
app.post("/api/login", signin);
app.use("/api/user", userRouter);
app.use(errorHandler);
app.use("/api", protect);

const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server up on port ${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
