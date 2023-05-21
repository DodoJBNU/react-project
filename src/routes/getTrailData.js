const multer = require("multer");
const express = require("express");
const router = express.Router();
const upload = multer({ dest: "./upload" });

const getTrailData_ctrl = require("../ctrl/getTrailData.ctrl");

router.post("/", upload.none(), getTrailData_ctrl.getTrailData);

module.exports = router;
