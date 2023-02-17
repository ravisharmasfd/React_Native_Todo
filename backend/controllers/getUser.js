const getUser = async(req,res)=>{
    try {
        if(req.user){
            res.json({user:req.user})
        }else{
            res.status(500).json({msg:'server error'})  
        }
    } catch (error) {
        res.status(500).json({msg:'server error'})
    }
}
export default getUser;