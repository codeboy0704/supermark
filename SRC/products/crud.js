export const getOne = (model) => async (req, res, next) => {
  try {
    const doc = await model
      .findOne({
        createdBy: req.user._id,
        _id: req.params.id,
      })
      .lean()
      .exec();
    if (!doc) {
      return res.status(400).send({ message: "Product not found" });
    }
    res.status(201).json({ data: doc });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

export const getMany = (model) => async (req, res, next) => {
  try {
    const docs = await model.find({ createdBy: req.user._id });
  } catch (e) {
    console.error(e);
    next(e);
  }
};
