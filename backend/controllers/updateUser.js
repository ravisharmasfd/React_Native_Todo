import User from '../models/user.js';
const updateUser = async(req,res)=>{
    try {
        const {firstName,lastName} = req.body;
        const update = await User.updateOne({_id:req.user._id},{firstName,lastName});
        const user = await User.findOne({_id:req.user._id},{password:0})
        res.json({msg:'Update Profile Successfully',user});
    } catch (error) {
        res.status(400).json({msg: "check your details"})
    }
    
}
export default updateUser;