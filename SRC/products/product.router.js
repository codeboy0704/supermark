import { Router } from "express";
const router = Router();
import { create, createMany, getProduct, getSingleProduct } from "./product.controller";
import { userValidation } from "../utils/auth";
router.post("/create/one", create)
router.post("/get/many", getProduct)
router.post("/get/one", getSingleProduct)
router.get("/create/many", userValidation, createMany)

export default router