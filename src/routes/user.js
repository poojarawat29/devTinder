const express=require("express")
const userRouter=express.Router()
const userAuth=require("../middleware/auth")
const ConnectionRequest=require("../models/connectionRequest")


// get all the pending connection requests from loggedIn user
userRouter.get("/user/requests/received", userAuth, async(req,res)=>{
    try{
        const loggedIn=req.user
        const connectionRequests=await ConnectionRequest.find({
            toUserId:loggedIn._id,
            status:"interested"
        }).populate("fromUserId",["firstName", "lastName","photUrl","age","skills","about"])

        res.json({
            message:"data fetched successfully",
            data:connectionRequests
        })
    }
catch(err){
    res.status(400).send("ERROR: "+err.message)
}
})

//user connections

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try{
const loggedIn=req.user
const connectionRequest=await ConnectionRequest.find({
    $or:[
        {
            toUserId:loggedIn._id, status:"accepted"

        },{fromUserId:loggedIn._id, status:"accepted"}
    ]
}).populate("fromUserId",["firstName", "lastName","photUrl","age","skills","about"])
const data=connectionRequest.map((row)=>

row.fromUserId);
    
res.json({
    data
})
    }
    catch(err){
        res.status(400).send("ERROR: "+err.message)
    }
})
module.exports=userRouter