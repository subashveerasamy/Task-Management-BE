 import users from '../Models/Users.schema.js';
 import jwt from 'jsonwebtoken';
 import bcrypt from 'bcrypt';
 
 export const createUser= async(req, res)=> {
    console.log("hii")
    const {name, email, password}=req.body;
    if(!name || !email || !password){
        res.status(400).json({message:"All fields are required"})
    }
    const userName = name;
    const user= await users.findOne({email});
    const uniqUsername= await users.findOne({name:userName});

    if(user){
        return res.status(200).json({message:" user already exists"})
    }
    else if(uniqUsername){
        return res.status(200).json({message:"username already exists"})
    }
    else{
        const hashPassword=await bcrypt.hash(password, 10);
        const newUser= new users({
            name, 
            email,
             password: hashPassword
        })
        await newUser.save();
        res.status(200).json({message:"user registered successfully"});
    }
 }



export const updateUser= async(req, res)=>{
        const id=req.user.id;
        const {task}= req.body;
        const user=await users.findByIdAndUpdate(id,{task:task},{new:true});
        res.status(200).json({message:"task added successfully"})
}

export const getUser= async(req, res)=>{
    const id=req.user.id;
    const user= await users.findById(id);

    res.status(200).json({user:user});
}

export const userLogin= async(req, res) =>{
    try {
        const {email,password}=req.body;
        const user=await users.findOne({email:email});
        if(!user){
            res.status(200).json({message:"Email not found"})
        }
        else{
            const isMatch=await bcrypt.compare(password,user.password);
            if(!isMatch){
                res.status(200).json({message:"Invalid credentials"})
           
                 }
            else{
                const token= jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
            res.status(200).json({message:"Login successful", token:token});
            }
          
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
}
}