import Stablishment from "./Establishment";
import Product from "../products/Products";
export async function createStablishmentOnce(req,res,next){
if(!name){
    return res.status(400).json({message: "At least you must provide a name"})
}
 try{
    const stablishment = await Stablishment.create({
        name,
    })
    return res.status(201).json({data: stablishment})
 }catch(e){
    next(e)
 }
}

export async function getStablishment(req,res,next){
    try{
        const stablishment = await Stablishment.find({})
        res.status(200).json({data: stablishment})
    }catch(e){
        next(e)
    }
}

export async function saveProductsOnSta(req, res, next) { 
    try {
        let product = await Product.find({}).exec()
        let sta = await Stablishment.find({}).exec()
        if (sta[0].products.length === 0) {
            const staMapper = sta.map(async staEl => {
                const find = product.map(async prEl => {
                    let found = prEl.prices.find(el => el.stablishment == staEl.name)
                    if (found) { 
                        let updated = await Stablishment.findOneAndUpdate({ name: found.stablishment }, { $push: { products: prEl._id } }, { new: true })
                        return updated
                    }
                })
            return find
            })
            return res.status(200).json({data: staMapper})
        }
        return res.status(201).json({data: "Already saved"})
    } catch (e) {
        next(e)
    }
}


export async function getProductsOnSta(req, res, next) { 
    try {
        let sta = await Stablishment.findOne({ name: req.body.name }).exec()
        if (!sta) {
            console.log(req.params)
            return res.status(404).json({ message: "Stablishment not found" })
        }
        const productIds = sta.products.map(product => product);
        const products = await Product.find({ _id: { $in: productIds } }).exec();
        const productNames = products.map(product => product);
       res.status(201).json({data: productNames})
        
    } catch (e) {
        next(e)
    }
}
