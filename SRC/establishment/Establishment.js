import mongoose from "mongoose";

const establishmentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    alt:{
        type: Number,
        trim: true,
        maxlength: 40
    },
    lon:{
        type: Number,
        trim: true,
        maxlength: 40
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }]
}, {timestamps: true})

const Establishment = mongoose.model("stablishment", establishmentSchema)
export default Establishment