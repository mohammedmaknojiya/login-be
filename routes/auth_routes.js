const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/auth_ctrl");

//add new user
router.post("/signup", authCtrl.addUser);

//get user
router.post("/login", authCtrl.getUser);

module.exports = router;
