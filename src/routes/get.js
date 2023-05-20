const multer = require("multer");
const express = require("express");
const router = express.Router();
const upload = multer({ dest: "./upload" });

const get_ctrl = require("./get.ctrl");

router.post("/", upload.none(), get_ctrl.getLocationId);

module.exports = router;
