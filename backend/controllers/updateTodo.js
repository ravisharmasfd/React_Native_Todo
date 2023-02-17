import Todo from "../models/todo.js";

const updateTodo = async(req,res)=>{
    try {
        
        const {id} = req.params;
    const {todo} = req.body;    
    const findTodo = await Todo.findOne({_id:id,userId:req.user._id});
    
    if(findTodo){
       const updateTodo = await Todo.updateOne({_id:id},{todo});
        res.json({msg:'Todo is updated'})
        return;
    }else{
        res.status(400).json({msg:"Todo not existed"})
        return;
    }
    } catch (error) {
        res.status(500).json({msg:'server error'})
    }
}
export default updateTodo;