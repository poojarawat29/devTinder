const express=require("express")
const userRouter=express.Router()
const userAuth=require("../middleware/auth")
const ConnectionRequest=require("../models/connectionRequest")
const User=require("../models/user")

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

// feed -> getting all the users except loggedIn user and the users who are already connected with loggedIn user
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page || 1);
    let limit = parseInt(req.query.limit || 10);
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select("firstName lastName photoURL about age gender skills")
      .skip(skip)
      .limit(limit);

    res.send(users);
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});
module.exports = userRouter;