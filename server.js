"use strict";

const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const multer = require("multer");
const upload = multer({ dest: "./upload" });

//router
const login = require("./src/routes/login");

app.use("/", login);

module.exports = app;
