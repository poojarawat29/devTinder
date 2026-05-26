const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true
    }, 
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
                required:true,
                
    },
    age:{
        type:Number 
    },

    gender:{
        type:String,
        
     },
     about:{
        type: String,
        default:"this is the default about section"
     },
     photoURL:{
        type:String,
        default:"https://www.kindpng.com/imgv/ioJmwwJ_dummy-profile-image-jpg-hd-png-download/"
     },

 
})

const UserModel=mongoose.model("User",userSchema)

module.exports=UserModel