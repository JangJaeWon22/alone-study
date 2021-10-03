"use strict";

const express = require("express");
const router = express.Router();
const controller = require("./home-controller");

//컨트롤러 연결 - controller - rendering - home의 키 값 = 루트페이지
//컨트롤러 연결 - ontroller - rendering - login의 키 값 = 로그인 페이지
router.get("/", controller.rendering.home);
router.get("/login", controller.rendering.login);
router.get("/register", controller.rendering.register)

router.post("/login", controller.process.login);
router.post("/register", controller.process.register)

module.exports = router;
