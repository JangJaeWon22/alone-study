'use strict'

const express = require('express')
const router = express.Router()
const userCtrl = require('./controller/users-ctrl')
const boardCtrl = require('./controller/boards-ctrl')
const { verfyToken } = require('./middlewares/auth-middlewares')

//컨트롤러 연결 - controller - rendering - home의 키 값 = 루트페이지
router.get('/', userCtrl.rendering.home)
router.get('/login', userCtrl.rendering.login)
router.get('/register', userCtrl.rendering.register)

router.post('/login', userCtrl.process.login)
router.post('/register', userCtrl.process.register)

//사용자 인증
router.get('/user/me', (req, res) => {
  res.send({})
})

module.exports = router
