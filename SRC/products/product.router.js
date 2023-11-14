import { Router } from "express";
const router = Router();
import { create, createMany, getProduct, getProductByName, getProductById, getProductName } from "./product.controller";
import { isAdmin, userValidation, verifyUser } from "../utils/auth";
router.post("/", verifyUser, isAdmin, create) // 
router.post("/bulk", verifyUser, isAdmin, createMany) //Createmany o batch
router.get("/name", getProductByName)
router.get("/:id", getProductById)
router.get("/:page/:limit", getProduct) // Se obtiene a través del root, limit & page query params
router.get("/simplified", getProductName) // could use simplified

export default router