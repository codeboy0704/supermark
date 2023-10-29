import { Router } from "express";
const router = Router();
import { deleteUser, getUser } from "./user.controllers";
import { isAdmin, verifyUser } from "../utils/auth";

//
router.get("/:id", verifyUser, isAdmin, getUser);
router.delete("/:id", verifyUser, isAdmin, deleteUser);

export default router;
