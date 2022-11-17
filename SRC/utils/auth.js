import jwt from "jsonwebtoken";
import { config } from "../config/dev";
import User from "../models/usermodel";

export const newToken = (user) => {
  return jwt.sign({ id: user.id }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token) => {
  new Promise((resolve, reject) => {
    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

export const signup = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).send({ message: "User and password require" });
  }
  try {
    const user = await User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    console.error(e);
    return res.status(400).end();
  }
};

export const signin = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({ message: "User and password require" });
  }

  const user = User.findOne({ username: username }).exec();
  if (!user) {
    return res.status(401).send({ message: "Not Auth" });
  }

  try {
    const match = await User.checkPassword(password);
    if (!match) {
      return res.status(401).send({ message: "Not auth" });
    }
    const token = newToken(user);
    return res.status(201).send({ token });
  } catch (e) {
    console.error(e);
    return res.status(401).send({ message: "Not auth" });
  }
};

export const protect = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }
  let token = req.headers.authorization.split("Bearer ")[1];
  if (!token) {
    return res.status(401).end();
  }
};
