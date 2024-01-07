const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/Athu")

router.post("/signup", signup);

module.exports = router;