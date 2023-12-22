const mongoose = require("mongoose");

//env mndy define kely tey srv load huil process obj mndy
require("dotenv").config();

const dbConnect = () => {
    //process obj mdun  DATABAEURL KDLA
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("DataBase is Suceessfully connected"))
    .catch((error) => {
        console.log("Issu in DB Connection")
        console.error(error.message)
        //what ?
        process.exit(1);
    });
}

module.exports = dbConnect;