const validator=require("validator")

const validateSignupData=(data)=>{
    const {firstName,lastName,email,password}=req.body
    if(!firstName || !lastName){
        throw new Error("name field is required")
    }
    else if(!validator.isEmail(email)){
        throw new Error("invalid email")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("password should be strong")
    }

}

module.exports=validateSignupData;