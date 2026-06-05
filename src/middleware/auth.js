const jwt=require("jsonwebtoken")
const User=require("../models/user")
const userAuth=async (req ,res, next)=>{
//read the token from req cookies
try
    {const cookies=req.cookies
const {token}=cookies
if(!token){
    return res.status(401).send("please login")
}
const decodedMsg=await jwt.verify(token,process.env.JWT_SECRET_KEY)


const {_id}=decodedMsg
const user=await User.findById(_id)
if(!user){
    throw new Error("user not found")
}
req.user=user
next()

}
catch(err){
    res.status(400).send("ERROR:"+err.message)
}
//validate the token
//find the user
};
module.exports=userAuth