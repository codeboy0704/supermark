import { Router } from "express";
import { getBinaryImg, saveImage } from "./image.controller";
const router = Router();


router.post('/save', saveImage)
router.get('/:title', getBinaryImg)

export default router