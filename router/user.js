const express = require('express')
const router = express.Router()
const { regUser, login } = require('../router_handle/user')
const { validate_reg_login } = require('../schema/user')

// 注册
router.post('/reguser', validate_reg_login, regUser)
// 登录
router.post('/login', validate_reg_login, login)

module.exports = router