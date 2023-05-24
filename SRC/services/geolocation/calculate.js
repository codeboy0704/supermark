function toRadians(grados) {
  return grados * (Math.PI / 180);
}

function calculateDistance({userLocation, establishmentLocation}){
    const {userLat, userLon} = userLocation;
    const {establishmentLat, establishmentLon} = establishmentLocation;
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = toRadians(establishmentLat - userLat);
    const dLon = toRadians(establishmentLon - userLon);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(userLat)) * Math.cos(toRadians(establishmentLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c;
    return distancia;
}

function findNearestEstablishment({lat, lon, establishments}){
    const nearest = establishments.map(esta =>{
        const distance = calculateDistance({userLocation: {userLat: lat, userLon: lon}, establishmentLocation: {establishmentLat: esta.lat, establishmentLon: esta.lon}})
        return {...esta , distance}
    })

    const sorted = nearest.sort((a,b) => a.distance - b.distance);
    return sorted.slice(0,3).map(esta => ({...esta}))
}

export default findNearestEstablishment;