const express=require("express")
const authRouter=express.Router()
const validateSignupData=require("../utils/validate")
const bcrypt=require("bcrypt")
const User=require("../models/user")
const jwt=require("jsonwebtoken")

//signup api
authRouter.post("/signup",async(req,res)=>{
     try{
        
    const {firstName,lastName,email,password,age}=req.body
    
    const passwordHash=await bcrypt.hash(password,10)
    console.log(passwordHash)
    const user=new User( {firstName, lastName, email, password:passwordHash,age})
         
    await user.save()
    res.send("user has been saved in the database")
    
     } catch(err){
        res.status(400).send(err.message)
     }
    })
    
//login api

authRouter.post("/login",async(req,res)=>{
     try{
        const{email,password}= req.body
        const user= await User.findOne({email})
        if(!user){
            throw new Error("email or password is not correct ")
        }
       const isPasswordValid= await bcrypt.compare(password,user.password);
       if(isPasswordValid){
        const token= await jwt.sign({_id:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1h"})
        res.cookie("token",token)
        res.send("login successful")
    }else{
        throw new Error("email or password is not correct")
    }
}
catch(err){
    res.status(400).send("ERROR:"+err.message)
}
})


//logout api


authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())})


res.send("logout successfully")
})
module.exports=authRouter