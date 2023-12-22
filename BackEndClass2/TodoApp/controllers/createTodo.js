//import the model

const Todo = require("../models/Todo");

//define route handler

//async function bez baaki code wait nhi kryc database accress krcya time la
exports.createTodo = async(req,res) =>  {
    try {
        //extracft title and description from requst body
        const {title,description} = req.body;
        //create a new Todo Obj and insert in DB
        const response = await Todo.create({title,description});
        //send a json response wait a success flag
        req.status(200).json({
            success:true,
            data:response,
            message:"Entry Created Succssfully"

        })
    }
    catch(err) {
        console.error(err);
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:err.message,
        })
    }
}

