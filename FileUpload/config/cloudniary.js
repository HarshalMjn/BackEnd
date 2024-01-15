const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnenct = () => {
  try{
    cloudinary.config({
      cloud_name:process.env.CLUOD_NAME,
      api_key:process.env.API_KEY,
      pi_secret:process.env.API_SECRET,
    })

  }
  catch(error){
    console.log(error)
  }
}