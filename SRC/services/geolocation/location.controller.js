import Establishment from "../../establishment/Establishment";
import findNearestEstablishment from "./calculate";
import places from "./mockDtaLocation";
export async function getNearestPlaces(req,res,next){
    try{
        const latitudReferencia = 9.0557154343145426;
        const longitudReferencia = -79.5083552054962;
        const establishments = await Establishment.find({}).exec()
        const nearestEstablishments = findNearestEstablishment({lat : latitudReferencia, lon: longitudReferencia, establishments: establishments});
        res.status(200).json({data: nearestEstablishments})
    }catch(e){
        next(e)
    }
}