const express = require("express");
const router = express.Router();
const { createUser,deleteUser } = require("../controller/createUser");
const { getUser } = require("../controller/getUsers");
router.post("/createUser", createUser);
router.get("/getallUsers", getUser);
router.delete("/deleteUser",deleteUser)

module.exports = router;
