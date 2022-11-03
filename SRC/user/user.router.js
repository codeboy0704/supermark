import { Router } from "express";
const router = Router();
import { getUser, saveUser } from "./user.controllers";

//
router.get("/", getUser);
router.post("/", saveUser);

export default router;
