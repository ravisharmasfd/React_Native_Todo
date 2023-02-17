import { Router } from "express";
import {createTodo, deleteTodo, updateTodo ,fullfilTodo , getTodo} from "../controllers/index.js";
import authMiddleWare from "../middleware/auth.js";
const router = Router();

router.post("/",authMiddleWare,createTodo);
router.delete("/:id",authMiddleWare,deleteTodo)
router.patch("/:id",authMiddleWare,updateTodo)
router.put("/fullfil",authMiddleWare,fullfilTodo);
router.get('/',authMiddleWare,getTodo);

export default router;