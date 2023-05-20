import { Router } from "express";
const router = Router();
import { create, createMany, getProduct } from "./product.controller";
import { userValidation } from "../utils/auth";
router.post("/create/one", create)
router.get("/get/many", getProduct)
router.get("/create/many", userValidation, createMany)

export default router