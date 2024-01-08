const express = require("express");
const router = express.Router();

const { signup,login } = require("../controllers/Athu");;
const {auth, isStudent, isAdmin} = require("../middlewares/auth")

router.post("/signup", signup); //path and handler
router.post("/login",login);

//protected Route
router.get("/test",auth,(req,res) => {
    res.json({
        success:true,
        message:"Test"
    });
})

router.get("/student", auth,isStudent, (req,res) => {
    res.json({
        success:true,
        message:"Welcome to Proected route for Student",
    })
})   //path and middlewares(Koncey koncey)  mg call back function

router.get("/admin",auth, isAdmin, (req,res) => {
    res.json({
        success:true,
        message:"Welcome to Proected route for Student"
    })
})

module.exports = router;