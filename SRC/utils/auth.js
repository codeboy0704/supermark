import jwt from "jsonwebtoken";
import { config } from "../config/dev";
import User from "../user/usermodel";
import bcrypt from "bcrypt";

export const passwordValidation = ({ password }) => {
  const regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*_:])[a-zA-Z0-9!@#$%^&*_:]{6,16}$/;

  if (!regularExpression.test(password)) {
    const error = {
      message:
        "password should contain at least one number and one special character",
      state: false,
    };
    return error;
  }
  return true;
};

export function verifyPassword(password, hashPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashPassword, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
}

export const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

export const logOut = async (req, res, next) => {
  let token = req.headers["token"];
  try {
    let randomNumberToAppend = toString(Math.floor(Math.random() * 1000 + 1));
    let randomIndex = Math.floor(Math.random() * 10 + 1);
    let hashedRandomNumberToAppend = await bcrypt.hash(
      randomNumberToAppend,
      10
    );
    token = token + hashedRandomNumberToAppend;
    res.status(201).json({ message: "Log out successfully", token });
  } catch (e) {
    console.error(e);
    const err = {
      status: e.status,
      message: "Log out failed, try again later",
    };
    next(err);
  }
};

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;
  const userData = {
    name: username,
    password: password,
    email: email,
  };
  if (!username && !password) {
    return res.status(400).json({
      message: "User, password & email require",
      sta: { user: false, password: false, email: false },
    });
  } else if (!username) {
    return res.status(400).send({
      message: "User require",
      sta: { user: false, password: true },
    });
  } else if (!password) {
    return res.status(400).send({
      message: "Password Require",
      sta: { user: true, password: false },
    });
  } else if (!email) {
    return res.status(400).send({
      message: "Email Require",
      sta: { user: true, password: true, email: false },
    });
  }

  try {
    const Users = await User.find({}).exec();
    const findUser = Users.find((user) => user.name === username);
    const findEmail = Users.find((user) => user.email === email);
    if (findUser) {
      return res.status(400).send({
        message: "User already exist",
        sta: { user: false, password: true, email: true },
      });
    }
    if (findEmail) {
      return res.status(400).send({
        message: "Email already exist",
        sta: { user: true, password: true, email: false },
      });
    }
    const user = await User.create(userData);
    const token = newToken(user);
    res.status(201).json({ data: token });
  } catch (e) {
    console.error(e);
    const err = {
      status: e.status,
      message: "User Already Exist",
    };
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { username, password } = req.body;
  if (!username && !password) {
    return res.status(400).send({
      message: "User and password require",
      sta: { user: false, password: false },
    });
  } else if (!username) {
    return res.status(400).send({
      message: "User require",
      sta: { user: false, password: true },
    });
  } else if (!password) {
    return res.status(400).send({
      message: "Password require",
      sta: { user: true, password: false },
    });
  }

  const user = await User.findOne({ name: username }).exec();
  if (!user) {
    return res.status(404).send({
      message: "The user don't exist",
      sta: { user: false, password: true },
    });
  }

  try {
    console.log(user);
    const match = await verifyPassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        message: "Incorrect password",
        sta: { user: true, password: false },
      });
    }
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    // console.error(e);
    const error = { status: 401, message: "Not Auth" };
    next(error);
  }
};

export const verifyUser = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(401).send({ message: "Not auth" });
  }
  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload.id)
      .select("-password")
      .lean()
      .exec();
    req.user = user;
    if (!user.family) {
      return res.status(201).json({ message: "Auth", data: { user, family } });
    }
    const family = await Family.findById(user.family._id);
    return res.status(201).send({ message: "Auth", data: { user, family } });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export async function isAdmin(req, res, next) {
  const { user } = req.body
  const id = user._id
  try {
    let user = await User.findById(id).exec()
    if (!user)
      return res.status(404).send({ data: { message: "User not found" } })

    if (user.role !== config.roles.ADMIN) //Pass to func to check admin and return boolean
      return res.status(401).send({ data: { message: "Unauthorized" } })
    return res.status(201).send({ data: { message: "Credentials validated" } })
  } catch (e) {
    next(e)
  }
}

export async function makeAdmin(req, res, next) {
  const { admin, user } = req.body
  try {
    let getAdmin = await User.findById(admin._id).exec()
    if (!getAdmin) {
      return res.status(404).send({ data: { message: "Admin not found" } })
    }
    if (getAdmin.role !== config.roles.ADMIN) {
      return res.status(401).send({ data: { message: "Unauthorized" } })
    }
    let getUser = await User.findByIdAndUpdate(user._id, { role: config.roles.ADMIN })
    if (!getUser) {
      return res.status(404).send({ data: { message: "User not found" } })
    }
    return res.status(201).json({ data: { user: getUser, message: "User role updated" } })
  } catch (e) {
    next(e)
  }
}
