import { Router } from "express";
import { getBinaryImg, getMany, getOne, saveImage } from "./image.controller";
const router = Router();


router.post('/save', saveImage)
router.get('/', getMany)
// router.get("/:id", getOne)
router.get('/:id', getBinaryImg)

export default router