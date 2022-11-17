import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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

userSchema.pre("save", (next) => {
  bcrypt.hashSync(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = async function (password) {
  const passwordHash = this.password;
  const compared = bcrypt.compareSync(password, passwordHash);
  return compared;
};

const User = mongoose.model("user", userSchema);

export default User;
