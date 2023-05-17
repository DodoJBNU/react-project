"use strict";
const db = require("../config/db");

const add = (req, res) => {
  let user_id = req.body.user_id;
  let location1 = req.body.location1;
  let location2 = req.body.location2;
  let location3 = req.body.location3;
  let location4 = req.body.location4;
  let location5 = req.body.location5;

  console.log(location1[0]);
  console.log(location1[1]);
};

module.exports = {
  add,
};

/* =? {key, value} 로 저장되는데, {key만 존재할 경우,} {key, key} 로 저장. 따라서 위 내용은 아래와 같음.
module.exports{
    login : login 
}
*/
