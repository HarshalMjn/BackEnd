//note :bussiness logic in form of handler function

const File = require("../models/File")

//local file upload --> handler function --> clinet key path sey media fetch krto and server key ek path pr upload krto hey
 exports.localFileUpload = async (req, res) => {
    try{
      //fetch file from requst
      const file = req.files.file;
      console.log("This file -->", file);
      
      //create path where file need to be stored on server
      let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
      console.log("Path ->", path)
       
      //add path to move function 
      file.mv(path, (err) => {
        if (err) {
          console.log("Error moving file:", err);
          // Handle the error, possibly by sending an error response to the client
      } else {
          console.log("File moved successfully!");
          // Continue with any additional logic after the file has been moved
      }

      });
      
      //create a successful response
      res.json({
        success:true,
        meassage:"Local file Upload Successfuly",
        
      })

    }
    catch(error) {
       console.log(error)
    }
 }