import jwt from "jsonwebtoken";
import { config } from "../config/dev";
import User from "../user/usermodel";
import bcrypt from "bcrypt";
import Family from "../family/family.model";
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

export const signup = async (req, res, next) => {
  const { username, password } = req.body;
  const userData = {
    name: req.body.username,
    password: password,
  };
  if (!username && !password) {
    return res.status(400).json({
      message: "User and password require man",
      sta: { user: false, password: false },
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
  }

  try {
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
  if (!username || !password) {
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
    return res.status(401).send({
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
    console.error(e);
    // const error = { status: 401, message: "Not Auth" };
    // next(error);
  }
};

export const verifyUser = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    res.status(403).send({ message: "Not auth" });
  }
  try {
    const payload = await verifyToken(token);
    const user = await User.findById(payload.id)
      .select("-password")
      .lean()
      .exec();
    req.user = user;
    res.status(201).send({ message: "Auth", data: user });
    next();
  } catch (e) {
    console.error(e);
    next(e);
  }
};

// export const protect = async (req, res, next) => {
//   if (!req.headers.authorization) {
//     return res.status(401).end();
//   }
//   let token = req.headers.authorization.split("Bearer ")[1];
//   if (!token) {
//     return res.status(401).end();
//   }
//   try {
//     const payload = await verifyToken(token);
//     const user = await User.findById(payload.id)
//       .select("-password")
//       .lean()
//       .exec();
//     req.user = user;
//     next();
//   } catch (e) {
//     next(e);
//   }
// };
