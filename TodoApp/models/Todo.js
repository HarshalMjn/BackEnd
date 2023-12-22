
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            maxLength:50,
        },
        description: {
           type:String,
           required:true,
           maxLength:50,
        },
        CredentAt: {
            type:Date,
            required:true,
            defaul:Date.now(),
        },
        updatedAt:{
            type:Date,
            required:true,
            default:Date.now(),
        }
    }
);

module.exports = mongoose.model("todo", todoSchema);