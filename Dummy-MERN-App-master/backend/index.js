const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/database");
const userRoutes = require("./routes/user");
const app = express();
var cors = require("cors");
const PORT = process.env.PORT || 4000;



app.use(
  cors({
    origin: {"https://deploy-mern-1whq.vercel.app"},
    method:{"POST","GET"},
    credentials:true
  })
);

// Middleware
app.use(express.json());

mongoose.connect("mongodb+srv://mahajanh006:CI8PymxIMQ3wWJia@cluster0.clzdqef.mongodb.net/?retryWrites=true&w=majority")

app.use("/api/v1", userRoutes);

// CORS Configuration
app.listen(PORT, () => {
  console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});

dbConnect();

app.get("/", (req, res) => {
  res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});
