"use strict";

const db = require("../../config/db");
const bcrypt = require("bcrypt");

class userStorage {
  //getUserInfo가 반환하는 값을 프로미스로 반환 해줘서 처리
  static getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id = ?;";
      db.query(query, [id], (err, data) => {
        if (err) reject(err);
        else resolve(data[0]);
      });
    });
  }

  //저장 부분
  static async save(clientInfo) {
    return new Promise((resolve, reject) => {
      const hashPsword = bcrypt.hashSync(clientInfo.psword, 10);
      const query = "INSERT INTO users(id, name, psword) VALUES(?, ?, ?);";
      db.query(query, [clientInfo.id, clientInfo.name, hashPsword], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ success: true });
        }
      });
    });
  }
}

module.exports = userStorage;
