import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });


async function makeConnection() {
  try {
     await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("Connected correctly to server");
  }catch(e){
    console.error(e)
  }
}

export default makeConnection;