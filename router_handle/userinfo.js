const db = require('../db/index')

exports.getUserInfo = (req, res) => {
  const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?'
  db.query(sql, req.auth.id, (err, result) => {
    if (err) return res.cc(err)
    if (result.length !== 1) return res.cc('查询失败')
    res.send({
      code: 200,
      msg: '查询用户信息成功',
      data: result[0]
    })
  })
}

exports.setUserInfo = (req, res) => {
  const sql = 'update ev_users set ? where id=?'
  const { body } = req
  db.query(sql, [body, body.id], (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows !== 1) return res.cc('修改用户信息失败')
    res.cc({ code: 200, msg: "修改用户信息成功" })
  })
}

exports.updatePassword = (req, res) => {
  // 判断用户是否存在
  const sql = 'select * from ev_users where id=?'
  db.query(sql, req.auth.id, (err, result) => {
    if (err) return res.cc(err)
    if (result.length !== 1) return res.cc('用户不存在')
    // 验证旧密码是否正确
    const bcrypt = require('bcryptjs')
    const compareResult = bcrypt.compareSync(req.body.oldPwd, result[0].password)
    if (!compareResult) return res.cc('原密码错误')

    // 加密后更新到数据库
    const sql = 'update ev_users set password=? where id=?'
    newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    db.query(sql, [newPwd, req.auth.id], (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc("修改密码失败")
      res.cc({ code: 200, msg: '修改密码成功' })
    })
  })
}

exports.updataAvatar = (req, res) => {
  const sql = "update ev_users set user_pic=? where id=?"
  db.query(sql, [req.body.avatar, req.auth.id], (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows !== 1) return res.cc("更换头像失败")
    res.cc({ code: 200, msg: '更换头像成功' })
  })
}