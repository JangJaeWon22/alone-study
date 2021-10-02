"use strict";

const userSchema = require("./user-schema");

class User {
  constructor(body) {
    this.body = body; //파라미터로 들어온 body를 넣어주는거임.
  }
  login() {
    const body = this.body;
    //정보 가져오기
    const { id, psword } = userSchema.getUserInfo(body.id);
    //로그인 로직
    if (id) {
      if (id === body.id && psword === body.psword) {
        return { success: true };
      }
      return {
        success: false,
        errorMassage: "아이디와 비밀번호를 확인 후 다시 시도해주세요",
      };
    }
    return {
      success: false,
      errorMassage: "아이디와 비밀번호를 확인 후 다시 시도해주세요",
    };
  }
}

module.exports = User;
