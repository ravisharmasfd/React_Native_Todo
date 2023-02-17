import { json } from 'express';
import Todo from '../models/todo.js'
const createTodo = async(req,res)=>{
    try {
        const {todo} = req.body;
        if(!todo){
            res.status(400),json({msg:"todo is empty"})
            return;
        }
        const {_id} = req.user;
        const cTodo = await new Todo({todo,userId:_id})
        await cTodo.save();
        res.json({msg:'created todo', todo:cTodo})
    } catch (error) {
        res.status(500).json({msg:'server error'})
    }
}
export default createTodo;