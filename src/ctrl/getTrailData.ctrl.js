const db = require("../config/db");

const getTrailData = (req, res) => {
  let user_id = req.body.user_id;
  let trail_id = req.body.trail_id;
  let postFlag = req.body.postFlag;

  let Trails = [];

  if (postFlag === "getTrailData") {
    console.log("postFlag가 getTrailData");
    // query

    let sql = "SELECT * FROM Trails WHERE id = ? ";
    let params = [trail_id];

    db.query(sql, params, (err, rows, fileds) => {
      if (err) {
        console.log(err);
      } else if (rows.length > 0) {
        let Trail = [rows[0].id, rows[0].user_id, rows[0].location_id, rows[0].title, rows[0].review, rows[0].facilities];

        let sql = "SELECT Latlocation1,Lnglocation1,Latlocation2,Lnglocation2,Latlocation3,Lnglocation3,Latlocation4,Lnglocation4,Latlocation5,Lnglocation5 FROM Locations WHERE id = ? ;";
        // location id로 location 정보 가져오기.
        db.query(sql, Trail[2], (err, rows, fileds) => {
          let location = [
            rows[0].Latlocation1,
            rows[0].Lnglocation1,
            rows[0].Latlocation2,
            rows[0].Lnglocation2,
            rows[0].Latlocation3,
            rows[0].Lnglocation3,
            rows[0].Latlocation4,
            rows[0].Lnglocation4,
            rows[0].Latlocation5,
            rows[0].Lnglocation5,
          ];

          let sql = "SELECT * FROM Comments WHERE trail_id = ?;";
          let params = [Trail[0]];

          db.query(sql, params, (err, rows, fileds) => {
            if (err) {
              console.log(err);
            } else {
              let comments = [];
              for (let i = 0; i < rows.length; i++) {
                comments.push([rows[i].id, rows[i].user_id, rows[i].trail_id, rows[i].comment]);
              }

              let sql = "SELECT COUNT(*) as cnt FROM Favorites WHERE user_id =? and trail_id =?;";
              let params = [user_id, trail_id];

              db.query(sql, params, (err, rows, fields) => {
                if (rows[0].cnt > 0) {
                  Trails = [Trail, location, comments, 1]; // 검색된 flag 존재. flag 1로 설정
                } else {
                  Trails = [Trail, location, comments, 0]; // 검색된 flag 없음. flag 0으로 설정.
                }
                console.log(Trails);
                res.send(Trails);
              });
            }
          });
        });
      } else {
        console.log("어떤 데이터도 불러오지 못했음.");
        res.send(Trails);
      }
    });
  } else if (postFlag === "addComments") {
    let comment = req.body.comment;

    let sql = "SELECT MAX(id) As max FROM Comments;";
    db.query(sql, (err, rows, fields) => {
      if (err) {
        console.log(err);
      } else {
        let comment_id = rows[0].max + 1;
        sql = "INSERT INTO Comments VALUES(?,?,?,?)";
        params = [comment_id, user_id, trail_id, comment];

        db.query(sql, params, (err, rows, fileds) => {
          if (err) {
            console.log(err);
          } else {
            res.send("코멘트 추가.");
          }
        });
      }
    });
  } else if (postFlag === "addFavorite") {
    let flag = req.body.flag;

    if (flag == 1) {
      // favorite insert
      let latitude = req.body.latitude;
      let longitude = req.body.longitude;

      let sql = "INSERT INTO Favorites VALUES (?, ?, ?, ?, ?);";
      let params = [user_id, trail_id, latitude, longitude, flag];

      db.query(sql, params, (err, rows, fileds) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Favorite 추가 성공");
        }
      });
    } else {
      // favorite delete
      let sql = "DELETE from Favorites WHERE user_id = ? and trail_id = ?;";
      let params = [user_id, trail_id];

      db.query(sql, params, (err, rows, fields) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Favoirte 삭제 성공");
        }
      });
    }
  }
};

module.exports = {
  getTrailData,
};
