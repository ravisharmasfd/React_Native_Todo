import Todo from "../models/todo.js";

const fullfil = async(req,res)=>{
    try {
        console.log('reached')
        const {id} = req.body;
        console.log("🚀 ~ file: fullfil.js:6 ~ fullfil ~ id", id)
        
        const findTodo = await Todo.findOne({_id:id,userId : req.user._id});
        if(findTodo){
            if(findTodo.fullfil){
                await Todo.updateOne({_id:id},{fullfil:false});
                res.json({msg:'Todo is not fullfil'})
                return
            }else{
                await Todo.updateOne({_id:id},{fullfil:true});
                res.json({msg:'Todo is fullfil'})
                return;
            }
            
        }else{
            res.status(400).json({msg:"Todo not existed"})
    }
    } catch (error) {
        res.status(500).json({msg:'server error'})
    }
}
export default fullfil;