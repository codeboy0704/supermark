import { Router } from "express";
const router = Router();
import {
  createFamily,
  getFamily,
  getFamilyMember,
  getMany,
} from "./family.controllers";
router.get("/", getFamily).post("/", createFamily);
router.get("/many", getMany);
router.post("/member", getFamilyMember);
export default router;
