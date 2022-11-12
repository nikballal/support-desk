const express = require("express");
const router = express("Router");
const { registerUser, loginUser } = require("../controllers/userController");

//register route
router.post("/", registerUser);

//login route
router.post("/login", loginUser);

module.exports = router;
