import Todo from "../models/todo.js";

const deleteTodo = async(req,res)=>{
    try {
        const {id} = req.params;
        
    const todo = await Todo.findOne({_id:id,userId:req.user._id});
    if(todo){
        await Todo.deleteOne({_id:todo._id});
        res.json({msg:'Todo is deleted'})
    }else{
        res.status(400).json({msg:"Todo not existed"})
    }
    } catch (error) {
        res.status(500).json({msg:'server error'})
    }
}
export default deleteTodo;