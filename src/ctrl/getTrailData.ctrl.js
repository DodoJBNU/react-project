const db = require("../config/db");

const getTrailData = (req, res) => {
  let user_id = req.body.user_id;
  let trail_id = req.body.trail_id;

  let Trails = [];

  // query

  let sql = "SELECT * FROM Trails WHERE user_id = ? and id = ? ";
  let params = [user_id, trail_id];

  db.query(sql, params, (err, rows, fileds) => {
    if (err) {
      console.log(err);
    } else {
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
        Trails = [Trail, location];
        console.log(Trails);
        res.send(Trails);
      });
    }
  });
};

module.exports = {
  getTrailData,
};
