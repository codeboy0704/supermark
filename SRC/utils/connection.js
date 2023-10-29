import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
import { config } from "../config/dev";

async function makeConnection() {
  try {
    mongoose.connect(config.DBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connected correctly to server");
  } catch (e) {
    console.error(e)
  }
}

export default makeConnection;