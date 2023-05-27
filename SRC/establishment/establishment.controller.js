import Establishment from "./Establishment";
import Product from "../products/Products";
import { createSingleEstablishment } from "../services/establishment/createSingleEstablishment";
import cleanData from "../utils/cleanData";

export async function createStablishmentOnce(req,res,next){
const establishments = cleanData()[0].establecimientos.map(el => el.stablishment)
    try{
        if(await Establishment.collection.countDocuments() == 0 ){ 
            establishments.map(el =>{
                createSingleEstablishment({name: el})
            })
            const savedEstablishments = await Establishment.find({}).exec()
            return res.status(201).json({message: "Stablishments created", data: savedEstablishments})
        }else{
            return res.status(400).json({message: "Stablishments already created"})
        }
    }catch(e){
        next(e)
    }
}

export async function getStablishment(req,res,next){
    try{
        let page = req.body.page || 0;
        let limit = req.body.limit || 1;
         const startIndex = page * limit;
        const endIndex = (page + 1) * limit;
        const result = {};
        const total = await Establishment.countDocuments().exec()
        if (startIndex > 0) {
            result.previous = {
             page: page - 1,
             limit: limit,
            };
        }
        if (endIndex < total) {
            result.next = {
                page: page + 1,
                limit: limit,
            };
        }
        result.total = total
        result.data = await Establishment.find({}).sort("-_id").skip(startIndex).limit(limit).exec()
        const stablishment = await Establishment.find({}).exec()
        res.status(200).json({data: result})
    }catch(e){
        next(e)
    }
}

export async function getStablishmentName(req,res,next){
    try{
        const establishments = await Establishment.find({}).exec()
        const names = establishments.map(el => el.name)
        res.status(200).json({data: names})
    }catch(e){

    }
}

export async function saveProductsOnSta(req, res, next) { 
    try {
        let product = await Product.find({}).exec()
        let sta = await Establishment.find({}).exec()
        if (sta[0].products.length === 0) {
            const staMapper = sta.map(async staEl => {
                const find = product.map(async prEl => {
                    let found = prEl.prices.find(el => el.stablishment == staEl.name)
                    if (found) { 
                        let updated = await Establishment.findOneAndUpdate({ name: found.stablishment }, { $push: { products: prEl._id } }, { new: true })
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
        let sta = await Establishment.findOne({ name: req.body.name }).exec()
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

export async function addLatLonToEstablishment(req, res, next){
    const {data} = req.body;
    try{
        const establishments = await Establishment.find({}).limit(2).exec()
        if(establishments[0].lat && establishments[0].lon){
            return res.status(400).json({message: "Already added"})
        }
        const map = data.map(async el =>{
            const found  = await Establishment.findOne({name: el.oldname ? el.oldname : el.name})
            if(found){
                if(el.oldname){
                    const updateName = await Establishment.findOneAndUpdate({name: el.oldname}, {name: el.name, lat: el.lat, lon:el.lon}, {new: true})
                    return updateName
                }else{
                    const updated = await Establishment.findOneAndUpdate({name: found.name}, {lat: el.lat, lon: el.lon}, {new: true})
                    return updated
                }
            }
        })
        const saved = await Promise.all(map)
        return res.status(201).json({data: saved})
    }catch(e){
       next(e)
    }
}
