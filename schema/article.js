const joi = require('joi')

const name = joi.string()
const alias = joi.string().alphanum().allow('')
const id = joi.number().integer().min(1).required()

exports.validate_add_cates = async (req, res, next) => {
  const schema = joi.object({
    name,
    alias
  })
  try {
    await schema.validateAsync(req.body)
    next()
  } catch (err) {
    return res.cc(err)
  }
}
exports.validate_cate_id = async (req, res, next) => {
  const schema = joi.object({
    id
  })
  try {
    await schema.validateAsync(req.params)
    next()
  } catch (err) {
    return res.cc(err)
  }
}
exports.validate_update_cate = async (req, res, next) => {
  const schema = joi.object({
    id,
    name,
    alias
  })
  try {
    await schema.validateAsync(req.body)
    next()
  } catch (err) {
    return res.cc(err)
  }
}