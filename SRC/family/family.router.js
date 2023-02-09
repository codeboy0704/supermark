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
router.post("/member/add", isAdmin, addMember);
router.delete("/", isAdmin, deleteFamily);
router.get("/many", getMany);
router.post("/member", isAdmin, getFamilyMember);
router.use(errorHandler);
export default router;
