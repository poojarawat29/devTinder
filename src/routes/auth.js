const express=require("express")
const authRouter=express.Router()
const validateSignupData=require("../utils/validate")
const bcrypt=require("bcrypt")
const User=require("../models/user")
const jwt=require("jsonwebtoken")
const validator = require("validator");

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

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      throw new Error("Invalid Email");
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isValidPassword = await user.validatePassword(password);
    if (isValidPassword) {
      const token = await user.getjwt();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).json({ user });
    } else {
      throw new Error("Invalid Vredentials");
    }
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

//logout api


authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())})


res.send("logout successfully")
})


module.exports=authRouter