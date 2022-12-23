import mongoose from "mongoose";
import { config } from "../config/dev";
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

async function makeNewConnection(uri) {
  try {
    return mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error(e);
  }

  // db.on("error", function (error) {
  //   console.log(`MongoDb :: connection ${this.name} ${JSON.stringify(error)}`);
  //   db.close().catch(() =>
  //     console.error(`MongoDB :: failed to close connection ${this.name}`)
  //   );
  // });

  // db.on("disconnected", function () {
  //   console.error(`MongoDB :: disconnected ${this.name}`);
  // });

  // return db;
}
// export const userConnection = makeNewConnection(config.userDB);
export default makeNewConnection;

// export const sessionsConnection = makeNewConnection(config.sessionDB);
