import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config/index.js";
const loginController = async(req,res)=>{
    const {email,password} = req.body;
    const userExist = await User.findOne({email},{__v:0});
    if(userExist){
        const match = await bcrypt.compare(password, userExist.password);
        if(match){
            const payLoad = {
                _id : userExist._id,
                email : userExist.email
              }
              const userjson = JSON.stringify(userExist);
              const userData = JSON.parse(userjson);
              delete userData.password;
              delete userExist.password;
              const token = jwt.sign(payLoad, JWT_SECRET);
              res.json({ message: "All Ok", token, user:userData});
        }else{
            res.status(401).json({msg : "check your details"})
        }
    }else{
        res.status(400).json({msg: "check your details"})
    }
}
export default loginController;