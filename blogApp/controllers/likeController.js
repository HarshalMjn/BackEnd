//import model
const Post = require("../models/postModel");
const Like = require("../models/likeModel");

//business logic

exports.createLike = async (req, res) => {
    try{
        //fetch data from req body
        const {post,user}  = req.body;
        //create a like object 
        const  like = new Comment({
            post,user
        });

        //save the new comment into the database
        const savedLike = await like.save();

        //find the post by ID, add the new comment to its commetnd array
        const udpatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id}}, {new: true} )
        .populate("likes") //populate the comments array with comment documents
        .exec();

        res.json({
            post: udpatedPost,
        });
    }
    catch(error){
        return res.status(500).json({
            error:"Error while Creating in Like",
            details:error.message,
        });
    }
};