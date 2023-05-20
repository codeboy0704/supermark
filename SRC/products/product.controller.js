import cleanData from "../utils/cleanData";
import axios from "axios";
import Product from "./Products";
import { createSingleProduct } from "../services/product/createSingleProduct";
export const create = async(req, res, next) => {
  const {name, prices} = req.body
  if(!name || !prices){
    return res.status(400).json({message: "You must provide the product name and the prices list"})
  }
  try{
    const product = await Product.create({name, prices})
    return res.status(201).json({data: product})
  }catch(e){
    next(e)
  }
}

export const createMany = async(req, res, next) => {
  const data = cleanData();
  if(await Product.collection.countDocuments() > 0){
    return res.status(400).json({message: "The database is not empty"})
  }
  let map = data.map(async (el) =>{
    try{
      const createdProduct = createSingleProduct({name: el.producto, prices: el.establecimientos})
      return createdProduct
    }catch(e){
      next(e)
    }
  }) 

  try{
    const product = await Promise.all(map)
    return res.status(201).json({data: product})
  }catch(e){
    next(e)
  }
}

export const getProduct = async(req, res, next) => {
  try{
    const product = await Product.find({})
    return res.status(200).json({data: product})
  }catch(e){
    next(e)
  }
}