const express=require("express")
const requestRouter=express.Router()
const userAuth=require("../middleware/auth")


requestRouter.get("/sendRequest",userAuth,async(req,res)=>{
    const user=req.user;
    console.log("sending a connection request")

    res.send(user.firstName + "sent the request")
})



module.exports=requestRouter