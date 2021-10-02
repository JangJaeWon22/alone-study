"use strict";

const User = require("../../models/user");

// 렌더링 하는 부분을 묶어서 rendering의 키 값에 가질 수 있도록 해줌
const rendering = {
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
  register: (req, res) => {
    res.render("home/register");
  }
};

// 받아온 정보를 처리하는 역활이라 process라고 지음
const process = {
  //로그인 활용
  login: (req, res) => {
    const user = new User(req.body);
    const response = user.login();
    return res.json(response);
  },
};

module.exports = {
  rendering,
  process,
};
