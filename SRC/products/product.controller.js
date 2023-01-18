import { Product } from "./product.model";

export async function createProduct(req, res, next) {
  const { name, onStock, family } = req.body;
  try {
    const product = await Product.create({ name, onStock, family });
    await product.save();
    res.status(201).json({ data: product });
  } catch (e) {
    next(e);
  }
}
