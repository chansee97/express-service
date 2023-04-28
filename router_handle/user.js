const db = require('../db/index')
// 注册用户
exports.regUser = (req, res) => {
  let { username, password } = req.body
  const sql = 'select * from ev_users where username=?'

  db.query(sql, username, (err, result) => {
    // 判断执行失败
    if (err) return res.cc(err)
    // 判断用户名是否已存在
    if (result.length > 0) return res.cc('用户名已存在')

    // 密码明文加密
    password = bcrypt.hashSync(password, 10)
    // 执行插入用户
    const sql = 'insert into ev_users set ?'
    db.query(sql, { username, password }, (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc("注册失败")
      res.cc({ code: 200, msg: '注册成功' })
    })
  })
}

// 用户登录
exports.login = (req, res) => {
  let { username, password } = req.body
  const sql = 'select * from ev_users where username=?'
  db.query(sql, username, (err, result) => {
    // 判断执行失败
    if (err) return res.cc(err)
    // 判断用户查询结果是否唯一
    if (result.length !== 1) return res.cc('用户不存在')
    // 判断密码是否正确
    const bcrypt = require('bcryptjs')
    const compareResult = bcrypt.compareSync(password, result[0].password)
    if (!compareResult) return res.cc('密码错误')
    // 生成JWT的Token字符串,剔除密码和头像
    const user = { ...result[0], password: "", user_pic: '' }
    const jwtToken = require('jsonwebtoken')
    const { jwtSecretKey } = require('../config')
    const tokenStr = jwtToken.sign(user, jwtSecretKey, { expiresIn: '6h' })
    res.send({
      code: 200,
      msg: '登录成功',
      token: tokenStr
    })
  })

}