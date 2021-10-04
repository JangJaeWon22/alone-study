"use strict";

const db = require("../config/db")

class userSchema {

  //getUserInfo가 반환하는 값을 프로미스로 반환 해줘서 처리
  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id = ?;";
      db.query(query, [id] , (err, data) => {
        if (err) reject(err);
        resolve(data[0]);
      });
    })
  }

  //저장 부분
  static async save(clientInfo) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users(id, nickname, psword) VALUES(?, ?, ?);";
      db.query(query, 
        [clientInfo.id, clientInfo.nickname, clientInfo.psword],
        (err) => {
        if (err) reject(err);
        resolve({ success: true });
      });
    })
  }
}

module.exports = userSchema;


