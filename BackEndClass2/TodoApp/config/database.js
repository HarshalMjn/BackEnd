const mongoose =  require("mongoose");

require("dotenv").config();

//function created -> connection between Node application and Database

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("DataBase Connenction is Successfull"))
    .catch(() => {
        console.log("Issue in DB connection");
        console.error(error.message);
        //what is this ?
        process.exit(1);
    });
}

module.exports = dbConnect;