import { Router } from "express";
import errorHandler from "../errorHandler";
import { isAdmin } from "../utils/auth";
const router = Router();
import {
  createFamily,
  getFamily,
  getFamilyMember,
  getMany,
} from "./family.controllers";
router.get("/", getFamily);
router.post("/", createFamily);
router.get("/many", getMany);
router.post("/member", isAdmin, getFamilyMember);
router.use(errorHandler);
export default router;
