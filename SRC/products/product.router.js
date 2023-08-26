import { Router } from "express";
const router = Router();
import { create, createMany, getProduct, getProductByName, getProductById, getProductName } from "./product.controller";
import { userValidation } from "../utils/auth";
router.post("/create", create)
router.get("/by/name", getProductByName)
router.get("/by/id", getProductById)
router.get("/many", getProduct)
router.post("/many/create", userValidation, createMany)
router.get("/many/name", getProductName)

export default router