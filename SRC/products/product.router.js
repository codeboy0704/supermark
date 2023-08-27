import { Router } from "express";
const router = Router();
import { create, createMany, getProduct, getProductByName, getProductById, getProductName } from "./product.controller";
import { userValidation } from "../utils/auth";
router.post("/create", create)
router.post("/many/create", userValidation, createMany)
router.get("/by/name", getProductByName)
router.get("/:id", getProductById)
router.get("/many/:page/:limit", getProduct)
router.get("/many/name", getProductName)

export default router