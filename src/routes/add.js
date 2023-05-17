const multer = require("multer");
const express = require("express");
const router = express.Router();
const upload = multer({ dest: "./upload" });

const add_ctrl = require("./add.ctrl");

router.post("/", upload.none(), add_ctrl.add);

module.exports = router;
