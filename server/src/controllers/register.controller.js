const bcryptjs = require('bcryptjs');
const UserModel = require('../models/UserModel');

const CreateUser = async (req,res)=>{
    const {name,email,password} = req.body;
    console.log(req.body);
    const checkEmail = await UserModel.findOne({email: email});
    if(checkEmail)
      {
          return res.status(400).json({
              message : "Already User Exists",
              error: true,
          })
      }
  
    const salt = await bcryptjs.genSalt(10);
    const hashed_password = await bcryptjs.hash(password, salt);
  
    const newUser ={
      name,
      email,
      password: hashed_password,
    }
  
    const user = new UserModel(newUser);
    const usersave = await user.save();
  
    return res.status(201).json({
      message : "New User Created successfully",
      data : usersave,
      success : true,
    })
  }

  module.exports={
    CreateUser
  }