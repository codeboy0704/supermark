import Establishment from "../../establishment/Establishment";
import findNearestEstablishment from "./calculate";
import places from "./mockDtaLocation";
export async function getNearestPlaces(req,res,next){
    const {lat, lon} = req.body;
    try{
        const establishments = await Establishment.find({}).exec()
        const nearestEstablishments = findNearestEstablishment({lat : lat, lon: lon, establishments: establishments});
        res.status(200).json({data: nearestEstablishments})
    }catch(e){
        next(e)
    }
}