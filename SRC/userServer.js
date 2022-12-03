import express from "express";
import morgan from "morgan";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import userRouter from "./user/user.router";
import connection from "./utils/connection";
import { config } from "./config/dev";
const port = 9000;
const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use("/user", userRouter);
console.log("userServer");
// connection(config.userDB).then(() =>
//   app.listen(port, () => {
//     console.log(`Server up on ${port}`);
//   })
// );
