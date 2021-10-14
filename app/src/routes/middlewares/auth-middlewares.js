"use strict";
const jwt = require("jsonwebtoken");

module.exports.verfyToken = (req, res, next) => {
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");
  console.log(authorization);
  next();
};
