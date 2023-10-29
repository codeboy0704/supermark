import { Router } from "express";
const router = Router();
import { getStablishment, createStablishmentOnce, saveProductsOnSta, getProductsOnSta, getStablishmentName, addLatLonToEstablishment } from "./establishment.controller";
import { getNearestPlaces } from "../services/geolocation/location.controller";
import { isAdmin, verifyUser } from "../utils/auth";

router.get("/product", getProductsOnSta)
router.get("/name", getStablishmentName)
router.get("/", getStablishment)
router.post("/", verifyUser, isAdmin, createStablishmentOnce)
router.post("/product", verifyUser, isAdmin, saveProductsOnSta)
router.post("/lon&lat", addLatLonToEstablishment)
router.post("/location/nearest", getNearestPlaces)

export default router