import User from "./usermodel";

export const getUser = async (req, res, next) => {
  const { _id } = req.params
  try {
    const user = await User.findById(_id).exec();
    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).send();
  }
};

export const getUserByToken = async (req, res, next) => {
  const data = req.verifyPayload
  try {
    if (data)
      return res.status(200).json({ data: data })
    else
      return res.status(400).send("No User data")
  } catch (e) {
    next(e)
  }
}

export const updateUser = async (req, res, next) => {
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

export const deleteUser = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await User.findByIdAndDelete(_id).exec();
    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};
