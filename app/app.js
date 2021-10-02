"use strict";

const express = require("express"); //모듈
const app = express(); //모듈
const bodyParser = require("body-parser"); //controller에서 req.body를 읽어들이지 못해서 라이브러리도 설치함.
const home = require("./src/routes/home"); //라우팅

//views 연결
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`));
//bodyParser이 json데이터를 읽을 수 있도록 함
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", home); // use 미들웨어

module.exports = app;
