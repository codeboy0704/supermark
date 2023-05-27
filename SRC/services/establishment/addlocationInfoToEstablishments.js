import axios from "axios"
export async function addLatLonToEstablishment({data}){
    try{
        const req =  await axios.post("http://localhost:8000/api/establishment/many/addlon&lat/once", {data: data})
        const res = await req.data;
        return res
    }catch(e){
        console.error(e.message)
    }
   

}