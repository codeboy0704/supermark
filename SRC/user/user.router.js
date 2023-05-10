import { Router } from "express";
const router = Router();
import { deleteUser, getUser } from "./user.controllers";

//
router.get("/find", getUser);
router.delete("/delete/one", deleteUser);

export default router;
