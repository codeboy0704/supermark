import mongoose from "mongoose";
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

mongoose.connection.on("openUri", (ref) => {
  console.log("Connected to mongo server");
});

mongoose.connection.on("error", (err) => {
  console.log("Could not connect to mongo server!");
});
const connection = async (url) => {
  try {
    return mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (e) {
    console.error(e);
  }
};

export default connection;
