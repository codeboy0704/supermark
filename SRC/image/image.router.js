import { Router } from "express";
import { getBinaryImg, getMany, getOne, saveImage } from "./image.controller";
import { isAdmin, verifyUser } from "../utils/auth";
const router = Router();


router.post('/', verifyUser, isAdmin, saveImage)
router.get('/', verifyUser, getMany)
router.get('/:id', getBinaryImg)

export default router