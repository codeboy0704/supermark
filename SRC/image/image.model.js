import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: Buffer,
        contentType: String,
        required: true
    }
})

const Image = mongoose.model('image', imageSchema);
export default Image