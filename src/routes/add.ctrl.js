"use strict";
const db = require("../config/db");

const add = (req, res) => {
  let trail_id;
  let location_id;
  let sql;
  let params;
  const flag = false; // 모든 행 지우려면 true로 바꿔서 사용
  let user_id = req.body.user_id;
  let locations = req.body.locations;
  let trailName = req.body.trailName;
  let facilityData = req.body.facilityData;
  let reviewData = req.body.reviewData;

  locations = locations.split("(, ) ").map((item) => item.replace(/\(|\)|\ /g, ""));

  locations = locations[0].split(",").map(parseFloat);

  let location1 = [locations[0], locations[1]];
  let location2 = [locations[2], locations[3]];
  let location3 = [locations[4], locations[5]];
  let location4 = [locations[6], locations[7]];
  let location5 = [locations[8], locations[9]];

  // 5가지의 location 분류 완료 상태
  // id 가져오기.
  sql = "SELECT COUNT(*) AS count FROM Locations;";
  params = [];
  db.query(sql, params, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      location_id = rows[0].count + 1; // 예를들어 row가 4라면. 다음 id는 4+1 = 5
      // location id 가져오기 완료
      // 위도 경도 추가 시작.
      sql = "INSERT INTO Locations VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      params = [location_id, location1[0], location1[1], location2[0], location2[1], location3[0], location3[1], location4[0], location4[1], location5[0], location5[1]];

      db.query(sql, params, (err, rows, fields) => {
        if (err) {
          console.error(err);
          res.status(500).send("서버 오류");
        } else {
          sql = "SELECT COUNT(*) AS count FROM Trails;";
          params = [];
          db.query(sql, params, (err, rows, fields) => {
            if (err) {
              console.log(err);
            } else {
              trail_id = rows[0].count + 1;
              sql = "INSERT INTO Trails VALUES(?, ?, ?, ?, ?, ?);";
              params = [trail_id, user_id, location_id, trailName, reviewData, facilityData];
              db.query(sql, params, (err, rows, fields) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send("산책로 추가 정상작동.");
                }
              });
            }
          });
        }
      });
      // 위도, 경도 추가 완료.
    }
  });

  //
};

module.exports = {
  add,
};

/* =? {key, value} 로 저장되는데, {key만 존재할 경우,} {key, key} 로 저장. 따라서 위 내용은 아래와 같음.
module.exports{
    login : login 
}
*/
