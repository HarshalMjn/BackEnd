//app create
const express = require("express")
const app = express();

//PORT find
require("dotenv").config();
const PORT = process.env.PORT || 3000;

//midleware add
app.use(express.json());
const fileupload =  require("express-fileupload");
app.use(fileupload());

//db connect
const db = require("./config/database");
db.connect();

//cloud connect
const cloudinary = require("./config/cloudniary");
cloudinary.cloudinaryConnenct()

//api route
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload",Upload);

//active server
app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})