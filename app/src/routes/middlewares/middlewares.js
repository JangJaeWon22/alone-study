"use strict"

const jwt = require("jsonwebtoken");
const User = require("../../models/user");
require('dotenv').config();

module.exports.verifyToken = (req, res, next) => {
    const { authorization} = req,headers;
    const [ authType, authToken ] = (authorization || "").split(" ");

    if (!authToken || authType !== "Bearer") {
        res.status(401).send({
            mag: "로그인 후 이용 가능한 기능입니다."
        });
        return;
    }

    try {
        const { userId } = jwt.verify(authToken, process.env.JWT_SECRET);
        // const user = await userSchema.getUserInfo(clientInfo.id);
        
    }catch (error) {
        if (error.name === 'TokenExpriedError'){ //유효 기간 초과
            return res.status(419).json({
                status: 419,
                msg: '토큰이 만료 되었습니다.'
            });
        }
        return res.status(401).json({
            status: 401,
            msg: "유효하지 않은 토큰 입니다."
        });
    }
}