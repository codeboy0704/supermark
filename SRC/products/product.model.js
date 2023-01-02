import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "You need to provide a product name"],
      sparse: true,
      trim: true,
    },
    onStock: {
      type: Number,
      required: [
        true,
        "You need to provide how much of these you have right now",
      ],
    },
    lastPrice: {
      type: Number,
      trim: true,
    },
    family: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "family",
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.index({ user: 1, name: 1 }, { unique: true });
export const Product = mongoose.model("product", productSchema);
