const express=require("express")
const app=express()

app.listen(5000 , ()=>{
    console.log("server is running on port 5000")
})

app.get("/",(req,res)=>{
    res.send("welcome to the main page")
})
app.get("/hello",(req,res)=>{
    res.send("hello  from the server")
})
app.get("/test",(req,res)=>{
    res.send("testing")
})