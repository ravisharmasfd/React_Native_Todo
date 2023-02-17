import { Router } from "express";
import {forgot, getUser, loginController,registerController, updateUser} from '../controllers/index.js'
import authMiddleWare from "../middleware/auth.js";
const router = Router();

router.post("/register",registerController);
router.post("/login",loginController);
router.get('/user',authMiddleWare,getUser);
router.post('/forgot',forgot);
router.put('/profile',authMiddleWare,updateUser);


export default router;