import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = "mongodb+srv://<username>:<password>@cluster0.85xa1ve.mongodb.net/?retryWrites=true&w=majority";
import { config } from "../config/dev";
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

async function connection() {
  try {
    await client.connect()
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close()
  }
}

connection().catch(console.dir)
