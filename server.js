const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const multer = require("multer");
const upload = multer({ dest: "./upload" });

app.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (err, data) => {
    console.log(data);
  });
});

// app.use('/image', express.static('/upload));

app.post("/", upload.none(), (req, res) => {
  let user_id = req.body.user_id;
  let psword = req.body.psword;
  let action = req.body.action;

  if (action == "signup") {
    let checkQuery = "SELECT COUNT(*) AS count FROM users WHERE user_id = ?";
    connection.query(checkQuery, [user_id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("서버 오류");
      } else {
        if (result[0].count > 0) {
          res.status(400).send("이미 사용 중인 아이디입니다.");
        } else {
          let sql = "INSERT INTO users VALUES (?, ?)";
          let params = [user_id, psword];
          connection.query(sql, params, (err, rows, fields) => {
            if (err) {
              console.error(err);
              res.status(500).send("서버 오류");
            } else {
              res.send("회원가입이 완료되었습니다."); // 성공 응답 전송
            }
          });
        }
      }
    });
  } else if (action === "login") {
    const sql = "SELECT * FROM users WHERE user_id = ? AND psword = ?";
    const params = [user_id, psword];
    connection.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.error(err);
        res.status(500).send("서버 오류");
      } else {
        if (rows.length > 0) {
          res.send("로그인 성공");
        } else {
          res.status(401).send("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
      }
    });
  } else {
    res.status(400).send("잘못된 요청입니다.");
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
