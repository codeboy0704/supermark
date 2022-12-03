import { Router } from "express";
const router = Router();
import { deleteUser, getUser } from "./user.controllers";

//
router.get("/", getUser);
router.post("/", deleteUser);

export default router;
