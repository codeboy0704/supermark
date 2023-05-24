import findNearestEstablishment from "./calculate";
import places from "./mockDtaLocation";
export async function getNearestPlaces(req,res,next){
    try{
        const latitudReferencia = 37.7749;
        const longitudReferencia = -122.4194;
        const nearestEstablishments = findNearestEstablishment({lat : latitudReferencia, lon: longitudReferencia, establishments: places});
        res.status(200).json({data: nearestEstablishments})
    }catch(e){
        next(e)
    }
}