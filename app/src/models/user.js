"use strict";

const userSchema = require("./user-schema");

class User {
  constructor(body) {
    this.body = body; //파라미터로 들어온 body를 넣어주는거임.
  }
  //user.login
  async login() {
    const clientInfo = this.body;
    try {
      //정보 가져오기
      const { id, psword } = await userSchema.getUserInfo(clientInfo.id);
      //로그인 로직
      if (id) {
        if (id === clientInfo.id && psword === clientInfo.psword) {
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
    } catch (err) {
      return { success: false, errorMassage: err};
    }
  }

  //user.register();
  async register() {
    const clientInfo = this.body;
    try {
      const response = await userSchema.save(clientInfo);
      return response;
    } catch (err) {
      return { success: false, errorMassage: err };
    }
  }
}

module.exports = User;
