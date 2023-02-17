import { Router } from "express";
import authRoute from './auth.js';
import todoRoute from './todo.js';
const router = Router();
router.use('/auth',authRoute);
router.use('/todo',todoRoute)
export default router;