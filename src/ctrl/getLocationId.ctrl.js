const db = require("../config/db");

const getLocationId = (req, res) => {
  let sql = "SELECT id, Latlocation1, Lnglocation1 From Locations;"; // location id sql query
  let Locations = [];
  db.query(sql, (err, rows, fileds) => {
    if (err) {
      console.log("서버오류", err);
    } else {
      for (let i = 0; i < rows.length; i++) {
        Locations.push([rows[i].id, rows[i].Latlocation1, rows[i].Lnglocation1]);
      }
      console.log(Locations);
      res.send(Locations);
    }
  });
};

module.exports = {
  getLocationId,
};
