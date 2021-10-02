"use strict";

const userSchema = require("../../models/user-schema");

// 렌더링 하는 부분을 묶어서 rendering의 키 값에 가질 수 있도록 해줌
const rendering = {
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
};

// 받아온 정보를 처리하는 역활이라 process라고 지음
const process = {
  //로그인 활용
  login: (req, res) => {
    const id = req.body.id,
      psword = req.body.psword;

    const users = userSchema.getUsers("id", "psword");

    const response = {};
    if (users.id.includes(id)) {
      const idx = users.id.indexOf(id);
      if (users.psword[idx] === psword) {
        response.success = true;
        return res.json(response);
      }
    }
    response.success = false;
    response.errorMassage = "로그인에 실패하셨습니다.";
    return res.json(response);
  },
};

module.exports = {
  rendering,
  process,
};
