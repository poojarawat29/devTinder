require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt=require("bcrypt")
const connectDB=require("./config/database")
const User=require("./models/user")
const validateSignupData=require("./utils/validate")
const cookieParser=require("cookie-parser")
const jwt=require("jsonwebtoken")
const userAuth=require("./middleware/auth")
const cors=require("cors") //we can use cors middleware to allow cross-origin requests from the frontend to the backend
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);app.use(express.json()) //we can use express.json() middleware to parse the request body and get the data in req.body
app.use(cookieParser()) //we can use cookie-parser middleware to parse the cookies and get the data in req.cookies

const authRouter=require("./routes/auth")
const profileRouter=require("./routes/profile")
const requestRouter=require("./routes/request")
const userRouter=require("./routes/user")
app.use("/",authRouter)
app.use("/",profileRouter)
app.use("/",requestRouter)
app.use("/",userRouter)
//login api




app.get("/profile",userAuth,async(req,res)=>{
 try{ 

      const user=req.user
res.send(user)
if(!user){
   throw new Error("user not found")
}

   else{
    res.send(user)
   }
}
catch(err){
    res.status(400).send("ERROR:"+err.message)      

}
})
//get user by email



app.get("/user",async(req,res)=>{
const userEmail=req.body.email;
try{
    const users=await User.find({email:userEmail})
    if(users.length===0){
        res.status(404).send("user not found")
    }else
    res.send(users)
}
catch(err){
    res.status(400).send("something went wrong",err)
}

    })


//feed ->getting all the users

app.get("/feed",async(req,res)=>{

    try{
        const users=await User.find({})
        res.send(users)
    }
    catch(err){
        res.status(400).send("something went wrong",err)
    }
})

//deleting user by id

app.get("/deleteID",async(req,res)=>{
    const userId=req.body.userId;
    try{
        const users=await User.findByIdAndDelete(userId)
        res.send("user deleted successfully")
    }
    catch(err){
        res.status(400).send("something went wrong",err)
    }
})

// update the user

app.patch("/update/:userId", async(req,res)=>{
    const userId=req.params?.userId
    const data=req.body;
    try{
         const is_allowed = ["lastName","photoURL","about","gender","age"]
    const isUpdateAllowed=Object.keys(data).every((k)=>
        is_allowed.includes(k)
    )
    if(!isUpdateAllowed){
        throw new Error("update not allowed")
}

        const users=await User.findByIdAndUpdate(userId,req.body)
        res.send("user updated successfully")
    }
    catch(err){
        res.status(400).send("something went wrong",err)
    }
})


//try and catch  for updattion allowed in the given field

 
connectDB().then(()=>{
    console.log("database is connected successfully")
    app.listen(7777,()=>{
        console.log("server is listening to port 7777")
    })
}).catch((err)=>{
console.log(err)
})






















// //we can give multiple request handlers for the same route and they will be executed one by one by using next() function

// //if dont use next() function then only first handler will be executed and other handlers will be ignored
// app.get("/user",(req,res,next)=>{
//     //if we give anything in colsole.log it will print in the terminal

// res.send("first response")
// next() //it will call the next handler for the same route
// },( req,res)=>{
//     res.send("second response")
// });

// // app.listen(5000, () => {
// //     console.log("server is running on port 5000");
// // });



// app.get("/getUserData",(req,res)=>{
//     try{
//         throw new Error("kfkwebfbk");
//         res.send("user data")
//     }
//     catch(err){
//         res.status(5000).send("something went wrong")
//     }


// })
// app.get("/getUserDAta",(err,req,res,next)=>{
// if(err){
//     res.status(500).send("something went wrong");
// }
// })

// app.listen(7777,()=>{
//     console.log("server is successfully listening to port 7777")
// })























// get will handle request call only to specific route but use will handle request call to all the routes which it matches with first
// app.get("/", (req, res) => {
//     res.send("welcome to the main page");
// });

// app.get("/hello", (req, res) => {
//     res.send("hello from the server");
// });

// app.get("/test", (req, res) => {
//     res.send("testing");
// });

// app.get("/user", (req, res) => {
//     res.send({ firstName: "pooja", lastName: "rawat" });
// });

// app.post("/user", (req, res) => {
//     res.send("data has been saved in the database");
// });

// app.delete("/user", (req, res) => {
//     res.send("data deleted from the database");
// });

// app.get(/ab?cd/, (req, res) => {
//     res.send("b is optional");
// });

// app.get(/ab+cd/, (req, res) => {
//     res.send("one or more b");
// });
