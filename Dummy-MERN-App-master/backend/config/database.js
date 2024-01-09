const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
  const dbUri = "mongodb+srv://mahajanh006:A5agBWDUYDHKBJn2@cluster0.uuswitg.mongodb.net/HashDatabase"

  console.log("DB URI:", dbUri);

  mongoose
    .connect(dbUri, {
     // useNewUrlParser: true,
      //useUnifiedTopology: true,
    })
    .then(() => console.log("DB CONNECTION SUCCESS"))
    .catch((err) => {
      console.log("DB CONNECTION ISSUES");
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
