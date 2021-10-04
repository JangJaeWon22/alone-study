"use strict";

const { response } = require("express");
const logger = require("../../config/logger");
const User = require("../../models/user");

// 렌더링 하는 부분을 묶어서 rendering의 키 값에 가질 수 있도록 해줌
const rendering = {
  home: (req, res) => {
    logger.info(`GET / 200 "홈 화면 이동"`);
    res.render("home/index");
  },
  login: (req, res) => {
    logger.info(`GET /login "로그인 화면 이동"`);
    res.render("home/login");
  },
  register: (req, res) => {
    logger.info(`GET /regiser "회원가입 화면 이동"`);
    res.render("home/register");
  },
};

// 받아온 정보를 처리하는 역활이라 process라고 지음
const process = {
  //로그인 활용
   login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    if (response.err){
      logger.error(`POST /login 200 Response: "success: ${response.success}, msg: ${response.err}"`)
    }else
    logger.info(
      `POST /login 200 Response: "success: ${response.success}, msg: ${response.msg}"`
      );
    return res.json(response);
  },
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    if (response.err){
      logger.error(`POST /login 200 Response: "success: ${response.success}, msg: ${response.err}"`)
    }else
    logger.info(
      `POST /register 200 Response: "success: ${response.success}, msg: ${response.msg}"`
      );
    return res.json(response);
  },
};

module.exports = {
  rendering,
  process,
};
