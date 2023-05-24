const db = require("../config/db");

const getLocationId = (req, res) => {
  let sql = "SELECT user_id, Latlocation1, Lnglocation1, id From Locations natural join Trails;"; // location id sql query
  let action = req.body.action;
  console.log(action);
  let Locations = [];

  if (action === "inquiry") {
    db.query(sql, (err, rows, fileds) => {
      if (err) {
        console.log("서버오류", err);
      } else {
        for (let i = 0; i < rows.length; i++) {
          Locations.push([rows[i].user_id, rows[i].Latlocation1, rows[i].Lnglocation1, rows[i].id, 0]); // flag 0으로 . non-favorite
        }
        console.log("일반 항목입니다.", Locations);
        res.send(Locations);
      }
    });
  } else if (action === "favorite") {
    let user_id = req.body.user_id;
    let sql = "SELECT * FROM Favorites WHERE user_id = ?;";
    let params = [user_id];

    db.query(sql, params, (err, rows, fields) => {
      if (err) {
        console.log("서버 오류", err);
      } else {
        for (let i = 0; i < rows.length; i++) {
          Locations.push([rows[i].user_id, rows[i].latitude, rows[i].longitude, rows[i].trail_id, 1]); // flag 1으로 . favorite signal
        }
        console.log("Favorite 항목입니다.", Locations);
        res.send(Locations);
      }
    });
  }
};

module.exports = {
  getLocationId,
};
