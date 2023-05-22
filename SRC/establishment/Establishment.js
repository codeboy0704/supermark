import mongoose from "mongoose";

const establishmentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    address:{
        type: String,
        trim: true,
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }]
}, {timestamps: true})

const Establishment = mongoose.model("stablishment", establishmentSchema)
export default Establishment