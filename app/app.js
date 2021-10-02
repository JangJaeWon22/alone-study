"use strict";

const express = require("express"); //모듈
const app = express(); //모듈
const home = require("./src/routes/home"); //라우팅

//views 연결
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.static(`${__dirname}/src/public`))
app.use("/", home); // use 미들웨어


module.exports = app;
