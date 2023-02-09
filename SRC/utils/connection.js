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
}
// export const userConnection = makeNewConnection(config.userDB);
export default makeNewConnection;

// export const sessionsConnection = makeNewConnection(config.sessionDB);
