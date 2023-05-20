import Product from "../../products/Products"
export async function createSingleProduct({name, prices}){
    try{
        const product = await Product.create({name, prices})
        return product
    }catch(e){
      console.error(e)  
    }
}