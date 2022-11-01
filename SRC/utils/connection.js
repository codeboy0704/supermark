import mongoose from "mongoose";
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const connection = async (url) => {
  try {
    await mongoose
      .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected"));
  } catch (e) {
    console.error(e);
  }
};

export default connection;
