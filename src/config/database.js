

const mongoose = require("mongoose");
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://namastedev:younganddumb@namastedev.hgtysqj.mongodb.net/");
}

module.exports=connectDB;
