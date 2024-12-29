import mongoose from 'mongoose';
import {format} from 'date-fns'

const taskSchema=new mongoose.Schema({
    title:{type:String, required:true},
    dueDate:{type:String, required:true},
    addedOn:{
        type:String,
        default: format(new Date(), 'yyyy-MM-dd')
    },
    description:{
        type:String,
        required:true
    },
    importance:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"pending"
    }
})

const userSchema= new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    task:{
        type:[taskSchema],
        default:[]
    }
})

const users= mongoose.model("users", userSchema);
export default users;