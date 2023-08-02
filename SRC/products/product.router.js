import { Router } from "express";
const router = Router();
import { create, createMany, getProduct, getProductByName, getProductById } from "./product.controller";
import { userValidation } from "../utils/auth";
router.post("/create/one", create)
router.post("/get/by/name", getProductByName)
router.post("/get/by/id", getProductById)
router.post("/get/many", getProduct)
router.get("/create/many", userValidation, createMany)

export default router