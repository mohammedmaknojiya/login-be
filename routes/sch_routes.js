const express = require("express");
const router = express.Router();

const schCtrl = require("../controllers/sch_ctrl");

//data
router.get("/data", schCtrl.getSchData);

module.exports = router;
