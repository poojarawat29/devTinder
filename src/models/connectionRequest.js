const mongoose=require("mongoose")
const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", // refernce to the user collection
        required:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["interested","accepted","ignored","rejected"],
        message:`{VALUE} is not a valid status`
    }

},
{
    timestamps:true
})

const ConnectionRequest=new mongoose.model("ConnectionRequest",connectionRequestSchema)
module.exports=ConnectionRequest