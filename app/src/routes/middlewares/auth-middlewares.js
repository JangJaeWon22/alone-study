"use strict";
const jwt = require("jsonwebtoken");

module.exports.verfyToken = (req, res, next) => {
  console.log("여기좀 지나가라;;");
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");
  console.log(authorization);
  next();
};
