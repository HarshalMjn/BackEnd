const express = require("express");
const app = express();

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to parse json request body
app.use(express.json());

//import router for TODO API
const todoRoutes = require("./routes/todos")
//mount the todo ASPI routes
app.use("/api/",todoRoutes);

//start server
app.listen(PORT,() =>{
    console.log(`server started successfully at ${PORT}`);
})

//connect to  the database
const dbConnect = require("./config/database")

//default Route
app.get("/",(req,res) => {
    res.send('<h1>This is HOMEPAGE</h1>')
})