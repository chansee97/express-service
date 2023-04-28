const joi = require('joi')

const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{5,12}$/).required()
const id = joi.number().integer().min(1).required()
const nickname = joi.string()
const email = joi.string().email()
const avatar = joi.string().dataUri().required().messages({
  'string.empty': "头像参数不能为空",
  'string.dataUri': "填入合法URI字符串"
})

const reg_login_schema = joi.object({
  username,
  password
})
exports.validate_reg_login = async (req, res, next) => {
  try {
    await reg_login_schema.validateAsync(req.body)
    next()
  } catch (err) {
    return res.cc(err)
  }
}

const setUserinfo_schema = joi.object({
  id,
  nickname,
  email,
})
exports.validate_setUserinfo = async (req, res, next) => {
  try {
    await setUserinfo_schema.validateAsync(req.body)
    next()
  } catch (err) {
    return res.cc(err)
  }
}
const updatePwd_schema = joi.object({
  oldPwd: password,
  newPwd: joi.not(joi.ref('oldPwd')).concat(password)
})
exports.validate_updatePwd = async (req, res, next) => {
  try {
    await updatePwd_schema.validateAsync(req.body)
    next()
  } catch (err) {
    return res.cc(err)
  }
}

const update_avatar_schema = joi.object({
  avatar,
})
exports.validate_update_avatar = async (req, res, next) => {
  try {
    await update_avatar_schema.validateAsync(req.body)
    next()
  } catch (err) {
    return res.cc(err)
  }
}