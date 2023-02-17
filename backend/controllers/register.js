import User from '../models/user.js';
import bcrypt from 'bcrypt';

const registerController = async(req,res)=>{
    const {firstName, lastName,email,password} = req.body;
    if (email === undefined || password === undefined || firstName === undefined) {
    
        res.status(404).json({ msg: "Check yor data" });
        return;
      }
    const findByEmail = await User.findOne({email});
    if(findByEmail){
        res.status(400).json({msg: "Same email already present"})
        return;
    }
    
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);
    const newUser = await new User({firstName, lastName,email,password:hash});

    try{
        const createUser = await newUser.save();
        res.json({msg:`new user ${firstName} ${lastName} is created on todo list app`})
    }
    catch(err){
    }
};

export default registerController;