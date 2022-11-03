import User from "./user";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  try {
    const user = await User.find({}).exec();
    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).send();
  }
};

export const saveUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const user = await User.create({ name, password, hashPassword: hash });
    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id).exec();
    res.status(200).json();
  } catch (e) {
    console.error(e);
  }
};
