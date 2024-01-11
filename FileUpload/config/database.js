const mongoose = require("mongoose");

require("dotenv").config();

const connect = () => {
    mongoose.connect(process.env.DATA_BASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB Is On"))
    .catch((error) => {
        console.log("Issue In DB");
        console.log(error.message);
        process.exit(1);
    });
};

module.exports = {
    connect,
};
