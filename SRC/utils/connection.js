import mongoose from "mongoose";
import { config } from "../config/dev";
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

function makeNewConnection(uri) {
  const db = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  db.on("error", function (error) {
    console.log(`MongoDb :: connection ${this.name} ${JSON.stringify(error)}`);
    db.close().catch(() =>
      console.error(`MongoDB :: failed to close connection ${this.name}`)
    );
  });

  db.on("connected", function () {
    mongoose.set("debug", function (col, method, query, doc) {
      console.log(
        `MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(
          query
        )},${JSON.stringify(doc)})`
      );
    });
  });

  db.on("disconnected", function () {
    console.error(`MongoDB :: disconnected ${this.name}`);
  });

  return db;
}

export const userConnection = makeNewConnection(config.userDB);
export const sessionsConnection = makeNewConnection(config.sessionDB);
