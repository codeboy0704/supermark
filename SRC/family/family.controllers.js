import User from "../user/usermodel";
import Family from "./family.model";

const ROLES_LIST = {
  admi: 5077,
  editor: 2072,
  user: 1022,
};

export const createFamily = async (req, res, next) => {
  const { familyName, password, username } = req.body;

  const existedFamily = await Family.findOne({ name: familyName });
  if (existedFamily) {
    return res.status(400).send({ message: "Family Name already in use" });
  }

  try {
    const admi = await User.findOne({ name: username }).lean().exec();
    if (!admi) {
      return res.status(403).send({ message: "User not found" });
    }
    const family = await Family.create({
      name: familyName,
      password,
      createdBy: admi._id,
    });
    const updated = await User.findByIdAndUpdate(
      admi._id,
      {
        family: family._id,
        role: ROLES_LIST.admi,
      },
      { new: true }
    );
    await family.save();
    return res
      .status(201)
      .json({ data: { family: family, admiInfo: updated } });
  } catch (e) {
    const err = {
      message: "Problem creating the family, try again later",
      status: 204,
    };
    next(err);
  }
};

export const getFamily = async (req, res, next) => {
  const { user } = req.body;
  console.log(req);
  if (!user) {
    return res.status(400).json({ message: "No user data provided" });
  }
  const userDoc = await User.findById(user._id);
  if (!userDoc) {
    return res.status(404).json({ message: "Owner not found" });
  }
  try {
    const doc = await Family.findOne({
      createdBy: userDoc._id,
      _id: user.family,
    });
    if (!doc) {
      console.log(id);
      res.status(404).send({ message: "Family not found" });
    }
    return res.status(201).json({ data: doc });
  } catch (e) {
    const err = {
      status: e.status,
      message: e.message,
    };
    next(err);
  }
};

export const getFamilyMember = async (req, res, next) => {
  const { family } = req.body;
  try {
    const findFamily = await Family.findOne({ name: family.name });
    if (!findFamily) {
      res.status(403).json({ message: "Family not found" });
    }
    const users = await User.findOne({ family: family._id });
    res.status(201).json({ data: users || "No users" });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const getMany = async (req, res, next) => {
  try {
    const families = await Family.find({}).lean().exec();
    res.status(201).json({ data: families });
  } catch (e) {
    const err = {
      message: "Problem getting the families",
      status: e.status,
    };
    next(err);
  }
};
