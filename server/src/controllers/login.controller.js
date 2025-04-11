const UserModel = require("../models/UserModel");
const bcryptjs = require('bcryptjs');

const CheckLogin = async (req,res)=>{
  try{
    const {email,password} = req.body;
 
    const user = await UserModel.findOne({email: email},'-__v');

    if(!user)
        {
            return res.status(400).json({
                message : "User not exists...!!!",
                error : true,
                success : false,
            })
        }
    
    const verify_password = await bcryptjs.compare(password,user.password);

    if(!verify_password)
        {
            return res.status(400).json({
                    message : "Please Check the password !!!",
                    error: true,
                    success : false,
                })    
        }


    const userdata = {
        id : user._id,
        email : user.email,
        name : user.name,
    }

    console.log(userdata);
    

    return res.status(201).json({
            message : "User Found !!!",
            user : userdata,
            success: true,
        })   
  }

  catch(err)
  {
     return res.status(500).json({
        message : err.message || err,
        error : true,
        success : false,
     })
  }
}

module.exports={
    CheckLogin,
}