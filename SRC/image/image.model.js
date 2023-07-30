import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        require: true,
    },
    title: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

const Image = mongoose.model('image', imageSchema);
export default Image