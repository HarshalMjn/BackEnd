//auth,isStud,isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

//for authN
exports.auth = (req,res, next) => {
    //next use beacuse next middlware jaayc hey
  try{
    //extract JWT token
    //Pending:other ways to fetch token
    const token = req.body.token;

    if(!token) {
        return res.status(401).json({
            success:false,
            message:'Token Missing'
        });

    }
    //verify the token
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log(payload)

        req.user = payload; //requsr under payload save because next (middlWA) check this is student or admin
    } catch(error) {
        return res.status(401).json({
            success:false,
            message:"Token is invalid"
        })
    }
    next();

  }
  catch(error) {
    return res.status(401).json({
        success:false,
        message:"Something went wrong while verifying token"
    })
}
}

//these two midleware for auhthorazition

//second middleware
exports.isStudent = (req,res) => {
    try{
            if(res.user.role !== "stdudent" ) {
                return res.status(401).json({
                    success:false,
                    message:"This is Proected Route for Studnet"
                })
            }
            //next middleware
            next(); 
    } catch(error) {
            return res.status(500).json({
                success:false,
                message:"User Role not match"
            })
    }
}

//last middlware
exports.isAdmin = (req,resnext) => {
    try{
        if(res.user.role !== "Admin" ) {
            return res.status(401).json({
                success:false,
                message:"This is Proected Route for Admin",
            })
        }
        //next middleware
        next(); 
    }  catch(error) {
        return res.status(500).json({
         success:false,
        message:"User Role not match",
    })
}
}
