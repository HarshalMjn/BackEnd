const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const  transporter = require("../config/transporter")

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    imageUrl:{
        type:String,
    },
    tag:{
        type:String,
    },
    email:{
        type:String,
    },
    

});

//post middlware
fileSchema.post("save", async function(doc) {
    try{
        console.log("DOC",doc)

        //transporter 
        const transporterInstance = await transporter();
        //TODO: shift this configuration under /config folder
        // let transporter = nodemailer.createTransport({
        //     host: process.env.MAIL_HOST,
        //     auth:{
        //         user:process.env.MAIL_USER,
        //         pass: process.env.MAIL_PASS,
        //     },
        // });


        //send mail 
        let info = await transporterInstance.sendMail({
            from:`CodeHelp - by Harshal`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html:`<h2>Hello</h2> <p>File Uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
        })
        
        console.log("INFO", info);


    }
    catch(error) {
        console.error(error);
    }
})


const File = mongoose.model("File",fileSchema);
module.exports = File;