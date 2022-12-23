import mongoose from "mongoose";
import bcrypt from "bcrypt";
import makeNewConnection from "../utils/connection";
import { config } from "../config/dev";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "You need to provide a username"],
      unique: true,
      validate: [],
      sparse: true,
    },
    password: {
      type: String,
      required: [true, "You need to provide a password"],
      validate: [],
    },
    settings: {
      type: String,
      default: "dark",
    },
    notifications: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      console.error("In pre");
    }
    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};

const userConnection = makeNewConnection(config.userDB)
  .then(() => console.log(`Connected to userDB`))
  .catch((e) => console.error(e));

const User = mongoose.model("user", userSchema);

export default User;
