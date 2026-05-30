const express=require("express")
const profileRouter=express.Router()
const userAuth=require("../middleware/auth")
const User=require("../models/user")
const {validateEditProfileData}=require("../utils/validate")

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user)
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    
    if (!validateEditProfileData(req)) {
        throw new Error("Invalid edit fields");
      return res.status(400).send("Invalid edit fields");
    }

    const user = req.user;
    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});


module.exports=profileRouter