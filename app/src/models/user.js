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
      const user = await userSchema.getUserInfo(clientInfo.id);
      //로그인 로직
      if (user) {
        if (user.id === clientInfo.id && user.psword === clientInfo.psword) {
          return { success: true };
        }
        return {
          success: false,
          msg: "아이디와 비밀번호를 확인 후 다시 시도해주세요", // 비밀번호 틀렸을 때
        };
      } 
      return {
        success: false,
        msg: "존재하지 않는 ID 입니다.", // 아이디 틀렸을 떄
      };
    } catch (err) {
      return { success: false, msg: "서버 점검 중입니다.", err}; //db연결 실패, id 없을때
    }
  }

  //user.register();
  async register() {
    const clientInfo = this.body;
    try {
      const response = await userSchema.save(clientInfo);
      return { success: true, msg: "회원이 되신 걸 축하드립니다."}
    } catch (err) {
      return { success: false, msg: "서버 점검 중입니다.", err}; //db연결 실패
    }
  }
}

module.exports = User;
