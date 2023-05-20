import { Router } from "express";
const router = Router();
import { createProduct, getProduct } from "./product.controller";
router.post("/create", createProduct)
router.get("/many", getProduct)

export default router