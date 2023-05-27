import express from "express";
import session from "express-session";
const MongoDBSession = require("connect-mongodb-session")(session);
import morgan from "morgan";
import bodyParser, { json, urlencoded} from "body-parser";
import cors from "cors";
import userRouter from "./user/user.router";
import productRouter from "./products/product.router"
import establishmentRouter from "./establishment/establishment.router"
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
import errorHandler from "./errorHandler";
import makeConnection from "./utils/connection";
import { getNearestPlaces } from "./services/geolocation/location.controller";
import { addLatLonToEstablishment } from "./services/establishment/addlocationInfoToEstablishments";
import establishmnetLocationData from "./services/geolocation/establishmentsLocation.json"
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
app.use(bodyParser.json());
app.post("/api/login", signin);
app.use("/api/establishment", establishmentRouter )
app.use("/api/user", userRouter);
app.use("/api/product", productRouter)
app.get("/api", verifyUser);
app.get("/api/location", getNearestPlaces )
app.post("/api/signup", signup);
app.delete("/api/logout", logOut);
app.use("/", errorHandler);

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
})

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server up on port ${port}`);
      makeConnection()
      // addLatLonToEstablishment({data: establishmnetLocationData})
    });
  } catch (e) {
    console.error(e);
  }
};

start();
