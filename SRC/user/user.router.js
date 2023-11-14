import { Router } from "express";
const router = Router();
import { deleteUser, getUser, getUserByToken } from "./user.controllers";
import { isAdmin, verifyUser } from "../utils/auth";

//
router.get("/:id", verifyUser, isAdmin, getUser);
router.get("/admin", verifyUser, isAdmin)
router.get("/", verifyUser, getUserByToken)
router.delete("/:id", verifyUser, isAdmin, deleteUser);

export default router;
