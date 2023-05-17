"use strict";
// 포트
const PORT = 3001;

const app = require("../server");

app.listen(PORT, () => {
  console.log("Server started on port 3001");
});
