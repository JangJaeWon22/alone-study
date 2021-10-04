"use strict";

const app = require("../app"); //app.js의 app 가져오기
const logger = require("../src/config/logger");
const PORT = process.env.PORT || 3000; // express 서버 3000

//express 서버 연결
app.listen(PORT, () => {
  logger.info(`${PORT} 포트에서 서버가 가동되었습니다.`);
});
