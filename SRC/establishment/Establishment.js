import mongoose from "mongoose";

const stablishmentSchema = new mongoose.Schema({
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

const Stablishment = mongoose.model("stablishment", stablishmentSchema)
export default Stablishment