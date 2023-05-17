const multer = require("multer");
const express = require("express");
const router = express.Router();
const upload = multer({ dest: "./upload" });

const login_ctrl = require("./login.ctrl");

router.post("/", upload.none(), login_ctrl.login);

module.exports = router;
