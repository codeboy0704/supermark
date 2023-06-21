import { Router } from "express";
const router = Router();
import { getStablishment, createStablishmentOnce, saveProductsOnSta, getProductsOnSta, getStablishmentName, addLatLonToEstablishment } from "./establishment.controller";
import { getNearestPlaces } from "../services/geolocation/location.controller";

router.get("/verify/save/product", getProductsOnSta)
router.get("/names", getStablishmentName)
router.get("/many", getStablishment)
router.post("/create/once", createStablishmentOnce)
router.post("/save/product", saveProductsOnSta)
router.post("/many/addlon&lat/once", addLatLonToEstablishment)
router.post("/location/nearest", getNearestPlaces)

export default router