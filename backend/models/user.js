import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        require: true,
        min: 5,
        max: 25,
        uppercase: true,
    },
    lastName:{
        type: String,
        required: true,
        min: 5,
        max: 25,
        uppercase: true,
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type: String,
        required: true,
        min: 8,
    }
},{timestamps:true});
export default new mongoose.model("User", UserSchema);