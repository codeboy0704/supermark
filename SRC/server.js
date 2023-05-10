import express from "express";
import session from "express-session";
const MongoDBSession = require("connect-mongodb-session")(session);
import morgan from "morgan";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import userRouter from "./user/user.router";
import { config } from "./config/dev";
import {
  logOut,
  protect,
  signin,
  signup,
  verifyToken,
  verifyUser,
} from "./utils/auth";
import User from "./user/usermodel";
import Family from "./family/family.model";
import familyRouter from "./family/family.router.js";
import errorHandler from "./errorHandler";

const port = 8000;
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


require("dotenv").config();
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use("/api/user", userRouter);
app.use("/api/family", familyRouter);
app.get("/api", verifyUser);
app.post("/api/signup", signup);
app.post("/api/login", signin);
app.delete("/api/logout", logOut);
app.use("/", errorHandler);

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
})

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server up on port ${port}`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
