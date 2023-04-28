const express = require('express')
const router = express.Router()
const { getUserInfo, setUserInfo, updatePassword, updataAvatar } = require('../router_handle/userinfo')

const { validate_setUserinfo, validate_updatePwd, validate_update_avatar } = require('../schema/user')

// 获取用户信息
router.get('/getUserinfo', getUserInfo)

// 更新用户信息
router.post('/setUserinfo', validate_setUserinfo, setUserInfo)

// 更新密码
router.post('/updatePassword', validate_updatePwd, updatePassword)

// 更新用户头像
router.post('/updataAvatar', validate_update_avatar, updataAvatar)

module.exports = router