"use strict";

const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//router
const login = require("./src/routes/login");
const add = require("./src/routes/add");
const getLocationId = require("./src/routes/get");

app.use("/", login);
app.use("/Add", add);
app.use("/Main", getLocationId);

module.exports = app;
