'use strict'

const { response } = require('express')
const logger = require('../../config/logger')
const User = require('../../models/users/user')

// 렌더링 하는 부분을 묶어서 rendering의 키 값에 가질 수 있도록 해줌
const rendering = {
  home: (req, res) => {
    logger.info(`GET 304 "홈 화면 이동"`)
    res.render('home/index')
  },
  login: (req, res) => {
    logger.info(`GET /login 304 "로그인 화면 이동"`)
    res.render('home/login')
  },
  register: (req, res) => {
    logger.info(`GET /regiser 304 "회원가입 화면 이동"`)
    res.render('home/register')
  },
}

// 받아온 정보를 처리하는 역활이라 process라고 지음
const process = {
  //로그인 활용
  login: async (req, res) => {
    const user = new User(req.body)
    const response = await user.login()
    const url = {
      method: 'POST',
      path: '/login',
      status: response.success ? 200 : response.err ? 500 : 400, //200 : 정상응답 , 300 : 페이지 이동시, 400: 클라이언트에서 실수, 500:서버에서 실수
    }
    log(response, url)
    return res.status(url.status).json(response)
  },
  //회원가입 활용
  register: async (req, res) => {
    const user = new User(req.body)
    const response = await user.register()
    const url = {
      method: 'POST',
      path: '/register',
      status: response.success ? 201 : response.err ? 500 : 409, //// 회원가입은 새로운 데이터를 생성하는 부분이라 201임
    }
    log(response, url)
    return res.status(url.status).json(response)
  },
}

// const verify = {
//   verifyToken: async (req, res) => {
//     return res.status.json();
//   },
// };

module.exports = {
  rendering,
  process,
  // verify,
}

const log = (response, url) => {
  if (response.err) {
    logger.error(
      `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.msg}`
    )
  } else {
    logger.info(
      `${url.method} ${url.path} ${url.status} Response: ${response.success} ${response.msg}`
    )
  }
}
