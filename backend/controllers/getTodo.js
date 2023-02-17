import { json } from 'express';
import Todo from '../models/todo.js'
const createTodo = async(req,res)=>{
    try {
        const todos = await Todo.find({userId:req.user._id}).sort({createdAt:-1});
        res.json({todos})
    } catch (error) {
        res.status(500).json({msg:'server error'})
    }
}
export default createTodo;