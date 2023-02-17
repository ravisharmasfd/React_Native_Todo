import mongoose from 'mongoose';

const TodoSchema = mongoose.Schema({
    todo:{
        type: String,
        require: true,
        min: 5,
        max: 1000,
    },
    userId:{
        type: mongoose.Types.ObjectId,
        require: true,
    },
    fullfil:{
        type: Boolean,
        default: false,
    }
},{timestamps:true});
export default new mongoose.model("Todo", TodoSchema);