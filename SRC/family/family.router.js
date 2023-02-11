import { Router } from "express";
import errorHandler from "../errorHandler";
import { isAdmin } from "../utils/auth";
const router = Router();
import {
  addMember,
  createFamily,
  deleteFamily,
  getFamily,
  getFamilyMember,
  getMany,
} from "./family.controllers";
router.get("/", getFamily);
router.post("/create", createFamily);
router.post("/add/member", isAdmin, addMember);
router.delete("/", isAdmin, deleteFamily);
router.get("/many", getMany);
router.get("/member", isAdmin, getFamilyMember);
router.use(errorHandler);
export default router;
