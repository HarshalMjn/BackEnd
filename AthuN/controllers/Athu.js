const bcrypt = require("bcrypt");
const User = require("../model/User");

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