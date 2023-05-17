"use strict";
const db = require("../config/db");

const login = (req, res) => {
  let user_id = req.body.user_id;
  let psword = req.body.psword;
  let action = req.body.action;

  if (action === "signup") {
    let checkQuery = "SELECT COUNT(*) AS count FROM users WHERE user_id = ?";
    db.query(checkQuery, [user_id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("서버 오류");
      } else {
        if (result[0].count > 0) {
          res.status(400).send("이미 사용 중인 아이디입니다.");
        } else {
          let sql = "INSERT INTO users VALUES (?, ?)";
          let params = [user_id, psword];
          db.query(sql, params, (err, rows, fields) => {
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
    db.query(sql, params, (err, rows, fields) => {
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
};

module.exports = {
  login,
};

/* =? {key, value} 로 저장되는데, {key만 존재할 경우,} {key, key} 로 저장. 따라서 위 내용은 아래와 같음.
module.exports{
    login : login 
}
*/
