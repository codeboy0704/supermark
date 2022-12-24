import mongoose from "mongoose";
import { config } from "../config/dev";
import makeNewConnection from "../utils/connection";

const familySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "You need to provide a family name"],
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      require: [true, "You need to provide an admi"],
    },
  },
  { timestamps: true }
);

const familyConnection = mongoose.createConnection(config.familiesDB);
const Family = familyConnection.model("family", familySchema);

export default Family;
