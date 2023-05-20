import Product from "./Products";
export const createProduct = async(req, res, next) => {
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

export const getProduct = async(req, res, next) => {
  try{
    const product = await Product.find({})
    return res.status(200).json({data: product})
  }catch(e){
    next(e)
  }
}