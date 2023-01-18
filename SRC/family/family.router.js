import { Router } from "express";
import errorHandler from "../errorHandler";
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
router.post("/member", getFamilyMember);
router.use(errorHandler);
export default router;
