import User from "../user/usermodel";
import Family from "./family.model";

const ROLES_LIST = {
  admi: 5077,
  editor: 2072,
  user: 1022,
};

export const createFamily = async (req, res, next) => {
  const { family, user } = req.body;
  if (!family || !user) {
    return res.status(400).json({ message: "No user or family data provided" });
  }

  try {
    const existedFamily = await Family.findOne({ name: family.name })
      .lean()
      .exec();
    if (existedFamily) {
      return res.status(400).send({ message: "Family name already in use" });
    }
    const admi = await User.findOne({ name: user.name }).lean().exec();
    if (!admi) {
      return res.status(403).send({ message: "User not found" });
    }
    const newFamily = await Family.create({
      name: family.name,
      password: family.password,
      createdBy: admi._id,
      members: {
        admi: admi._id,
        $push: { members: admi._id },
      },
    });
    const updated = await User.findByIdAndUpdate(
      admi._id,
      {
        role: ROLES_LIST.admi,
      },
      { new: true }
    )
      .lean()
      .exec();
    await newFamily.save();
    return res
      .status(201)
      .json({ data: { family: newFamily, admiInfo: updated } });
  } catch (e) {
    const err = {
      message: "Problem creating the family, try again later",
      status: 204,
    };
    next(err);
  }
};

export const addMember = async (req, res, next) => {
  const { user, family, member } = req.body;
  if (!user || !family || !member) {
    return res.status(400).json({ message: "No user data provided" });
  }
  try {
    const doc = await User.findOne({ name: user.name }).lean().exec();
    const foundFamily = await Family.findOne({ name: family.name });
    const foundMember = await User.findOne({ name: member.name }).lean().exec();
    // if (foundFamily.members.admi == doc._id) {
    //   const uptadeFamily = await Family.findByIdAndUpdate(
    //     doc._id,
    //     {
    //       $push: { members: foundMember._id },
    //     },
    //     { new: true }
    //   );
    //   return res.status(201).json({ data: uptadeFamily });
    // }
  } catch (e) {
    const err = {
      message: "Something went wrong, try again later",
      status: 400,
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

export const deleteFamily = async (req, res, next) => {
  const { family } = req.body;
  try {
    const doc = await Family.findOneAndDelete({ _id: family._id });
    if (!doc) {
      res.status(404).send({ message: "Family not found" });
    }
    res.status(201).json({ data: doc });
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
