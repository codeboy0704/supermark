import User from "../user/usermodel";
import Family from "./family.model";

export const createFamily = async (req, res, next) => {
  const { familyName, password, username } = req.body;
  const admi = await User.findOne({ name: username }).lean().exec();
  const existedFamily = await Family.findOne({ name: familyName });
  if (existedFamily) {
    return res.status(400).send({ message: "Family Name already in use" });
  }
  if (!admi) {
    res.status(403).send({ message: "User not found" });
  }
  try {
    const family = await Family.create({
      name: familyName,
      password,
      createdBy: admi._id,
    });
    await family.save();
    return res.status(201).json({ data: family });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const getFamily = async (req, res, next) => {
  try {
    const doc = await Family.findOne({
      createdBy: req.user._id,
      name: req.body.name,
    });
    if (!doc) {
      return res.status(404).send({ message: "Family not found" });
    }
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
    next();
  }
};
