//note :bussiness logic in form of handler function

const File = require("../models/File")
const cloudinary = require("cloudinary").v2

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

 function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = {folder};
  console.log("temp file path", file.tempFilePath);
  //automa. detect the file type.
  options.resource_type = "auto"
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload handler
exports.imageUpload = async (req, res) => {
  try{
      //data fetch
      const { name, tags, email} = req.body;
      console.log(name,tags,email);

      const file = req.files.imageFile;
      console.log(file);

      //Validation
      const supportedTypes = ["jpg", "jpeg", "png"];
      const fileType = file.name.split('.')[1].toLowerCase();
      console.log("File Type:", fileType);

      if(!isFileTypeSupported(fileType, supportedTypes)) {
          return res.status(400).json({
              success:false,
              message:'File format not supported',
          })
      }

      //file format supported hai
      console.log("Uploading to Codehelp");
      const response = await uploadFileToCloudinary(file, "Codehelp");
      console.log(response);


      //entry in DB
      const fileData = await File.create({
        name,
        tags,
        email,
        imageUrl:response.secure_url,
      })

      res.json({
        success:true,
        imageUrl:response.secure_url,
        meassage:"Image successfuly Uploaded"

      })
     


    } catch(error) {
         console.log(error);
         res.status(400).json({
          success:false,
          meassage:"Something went wrong"
         })
  }
}

///video upload handler
exports.videoUpload = async (req,res) => {
  try{
      //data fetch
      const { name, tags, email} = req.body;
      console.log(name,tags,email);
      
      const file = req.files.videoFile;

       //Validation
       const supportedTypes = ["mp4", "mov"];
       const fileType = file.name.split('.')[1].toLowerCase();
       console.log("File Type:", fileType);

       //TODO: add a upper limit of 5MB for Video
       if(!isFileTypeSupported(fileType, supportedTypes)) {
         return res.status(400).json({
          success:false,
          message:'File format not supported',
          })
       }

        //file format supported hai
      console.log("Uploading to Codehelp");
      const response = await uploadFileToCloudinary(file, "Codehelp");
      console.log(response);

      //db me entry save krni h
      const fileData = await File.create({
          name,
          tags,
          email,
          videoeUrl:response.secure_url,
      });

      res.json({
          success:true,
          videoUrl:response.secure_url,
          message:'Video Successfully Uploaded',
      })

  }
  catch(error) {
      console.error(error);
      res.status(400).json({
          success:false,
          message:'Something went wrong',
      })
  }
}

// imageSizeReducer

exports.imageSizeReducer = async (req,res) => {
  try{
    const { name, tags, email} = req.body;
    
    const file = req.files.imageFile;

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split('.')[1].toLowerCase();

    if(!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success:false,
        message:"File format not supported",
      })
    }

    const response = await uploadFileToCloudinary(file, "codehelp", 90);
    
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl:response.secure_url

    });

    res.json({
      success:true,
      imageUrl:response.secure_url,
      meassage:"Image is Successfully Uploaded"
    })


  } catch(error) {
    console.error(error);
        res.status(400).json({
          success:false,
          message:'Something went wrong',
    })

  }
}