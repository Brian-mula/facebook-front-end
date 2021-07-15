const express = require("express");
const User = require("../models/usermodel");
const bcrypt = require('bcrypt');

const router = express.Router();

// register

router.get("/register", async (res, req) => {

  try{
    // generate new password
    const salt= await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(req.body.password,salt)

    // generate new user
    const user = await new User({
      username=req.body.username,
      email=req.body.email,
      password=hashedPassword
    });
    // save user and give a response

    const user= await user.save()
    res.status(200).json(user)
  }catch (e){
    console.log(e)
  }
  
});
// register
router.post('/login',async (req,res)=>{
  try{
    const user= await User.findOne({email:req.body.email});
  !user && res.status(404).json("user not found")

  const validPassword= await bcrypt.compare(req.body.password,user.password)
  !validPassword && res.status(400).json('wrong password')

  res.status(200).json(user)
  }catch(e){
    console.log(e)
  }
  
})
