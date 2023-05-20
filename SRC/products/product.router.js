import { Router } from "express";
const router = Router();
import { create, createMany, getProduct } from "./product.controller";
router.post("/create/one", create)
router.get("/get/many", getProduct)
router.get("/create/many", createMany)

export default router