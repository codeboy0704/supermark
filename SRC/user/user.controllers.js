import UserModel from "./user";

export const user = (req, res) => {
  res.status(200).json({ data: req.user });
};
