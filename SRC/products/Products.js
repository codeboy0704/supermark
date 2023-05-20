import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
   name:{
        type: String,
        required: true,
        trim: true,
        maxlength: 80
    },
    prices:[{
        stablishment: {type: String, required: true},
        price: {type: String, required: true}
    }],
  },
  { timestamps: true }
);

productSchema.index({ user: 1, name: 1 }, { unique: true });
 const Product = mongoose.model("Product", productSchema);
 export default Product;
