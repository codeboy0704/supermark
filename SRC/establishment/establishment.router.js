import { Router } from "express";
const router = Router();
import { getStablishment, createStablishmentOnce, saveProductsOnSta, getProductsOnSta } from "./establishment.controller";

router.get("/verify/save/product", getProductsOnSta)
router.get("/many", getStablishment)
router.post("/create/once", createStablishmentOnce)
router.post("/save/product", saveProductsOnSta)

export default router