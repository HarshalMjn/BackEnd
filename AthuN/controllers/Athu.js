const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req,res) => {
    try{
        //get data
        const {name, email, password,role} = req.body;
        //check if user already exit
        const existingUser = await User.findOne({email});

        if(existingUser) {
           return res.status(400).json({
            succeess:false,
            message:"user alredy Exists",
           });
        }

        //secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(error){
            return res.status(500).json({
                succeess:false,
                message:'Error  in hashing Password'
            })
        }
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            role,
        })
        await newUser.save();
        console.log(newUser);

        return res.status(200).json({
            succeess:true,
            message:'User Created Successfully',
        });

    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            succeess:false,
            message:'User cannot be registered, please try agian'
        })
    }
}

//login
exports.login = async (req,res) => {
    try{
      //data fetch
      const { email, password} = req.body;
      //validation on emali and password
      if(!email || !password){
       return res.status(400).json({
        succeess:false,
        message:"Please fill all the details carefully",
       });
      }
      //check for registered user
      const user = await User.findOne({email});
      //if not a registered user
      if(!user){
        return res.status(401).json({
            succeess:false,
            message:"not a registered user",
        });
      }
      const payload = {
        email:user.email,
        id:user.id,
        role:user.role,
      }
      //verify password and generate a JWT token
      if( await bcrypt.compare(password,user.password)) {
        //password match
        let token = jwt.sign(payload, 
                             process.env.JWT_SECRET,
                             {
                                expiresIn:"2h",
                            });
        user.token = token;
        user.password = undefined;  
        
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
            httpOnly:true

        }  
        
        res.cookie("Hashalcookie",token,options).status(200).json({
            succeess:true,
            token,
            user,
            message:"User Logged in Successfully"
        })


              
      }
      else{
        //password do not match
        return res.status(402).json({
            succeess:false,
            message:"password do not match",
        })

      }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            succeess:false,
        
            message:"Login failure"
        })

    }
}