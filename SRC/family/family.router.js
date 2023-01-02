import { Router } from "express";
const router = Router();
import { createFamily, getFamily } from "./family.controllers";
router.post("/", createFamily).get("/", getFamily);

export default router;
