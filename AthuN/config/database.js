const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
   mongoose.connect(process.env.MOGODB_URL, {
    //flags
   })
   .then(() => {console.log("DB connected Successfully")})
   .catch((err) => {
    console.log("DB Issues");
    console.log(err);
    process.exit(1);
   })
}