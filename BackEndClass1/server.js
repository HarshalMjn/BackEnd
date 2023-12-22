


//Server Instantiate
const express = require('express');
const app = express();

//activate the server on  300 post
app.listen(3000, () => {
    console.log("server Started at port no. 3000")
});

//use to parese req.body in express -> PUT or POSt
const bodyParser = require('body-parser');

//specifically parse JSON data & add it to the requst.Body object
app.use(bodyParser.json());


// create get request (Routes)
app.get('/', (request,response) => {
    response.send("Hello Hii")
});
//jab bhi tum server mndy '/'  rotue vr  yeshil teva  response mndy  yeil hey -> server Started at port no. 3000

//create post request
app.post('/api/cars', (request,response) => {
  //destru. to take data from req.body
   const {name, brand} = request.body; 

   console.log(name);
   console.log(brand);

   response.send("car submited Sucessfully")
   //hamney post keli hoti  tr response mndy string return kel

})

//connection created between Express server and MongoDB

const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost:0.0.0.0//myDatabase',{
   useNewUrlParser: true, // Add this line to handle deprecation warning
   useUnifiedTopology: true, // Add this line to handle deprecation warning
   
})

.then(() => {console.log("Connection Successful")})
.catch((error) =>{console.log("error")});

