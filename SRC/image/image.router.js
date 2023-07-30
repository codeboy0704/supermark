import { Router } from "express";
import { getBinaryImg, saveBinaryImg } from "./image.controller";
const router = Router();


router.post('/save/binary', saveBinaryImg)
router.get('/:title', getBinaryImg)

export default router