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


const validateEditProfileData=(req)=>{
    const allowedEditFields=["firstName","lastName","email","age","about","gender","photoURL","skills"]
    const isEditAllowed=Object.keys(req.body).every((k)=>       
         allowedEditFields.includes(k)
)
return isEditAllowed
}
module.exports={validateSignupData, validateEditProfileData};