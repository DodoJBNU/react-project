const express = require("express");
const app = express();
const path = require("path");
const bodyparser = require("body-parser");
const fs = require("fs");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const data = fs.readFileSync("./src/config/db.json");
const conf = JSON.parse(data);
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});

connection.connect();

app.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
