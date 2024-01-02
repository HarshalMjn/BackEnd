const express = require("express");
const router = express.Router();

//import Controller
const {createComment} = require("../controllers/commentController")
const {createPost} = require("../controllers/postController")




//Maooing Create
router.post("/comments/create",createComment)
router.post("/posts/create",createPost)



//export
module.exports = router;