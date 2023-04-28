const db = require('../db/index')

exports.getArticleCates = (req, res) => {
  const sql = 'select * from ev_article_cate where deleted=1 order by id asc'
  db.query(sql, (err, result) => {
    if (err) return res.cc(err)
    if (result.length === 0) return res.cc("查询文章分类失败")
    res.send({ code: 200, msg: '查询文章分类成功', data: result })
  })
}

exports.addArticleCates = (req, res) => {
  // 查询分类名或别名是否被占用
  const sql = 'select * from ev_article_cate where name=? or alias=?'
  const { name, alias } = req.body
  db.query(sql, [name, alias], (err, result) => {
    // sql语句失败
    if (err) return res.cc(err)
    // 分类名和别名查重
    if (result.length === 2) return res.cc('分类名和别名被占用，请重试')
    if (result.length === 1 && result[0].name === name && result[0].alias === alias) return res.cc('分类名和别名被占用，请重试')
    if (result.length === 1 && result[0].name === name) return res.cc('分类名被占用，请重试')
    if (result.length === 1 && result[0].alias === alias) return res.cc('别名被占用，请重试')
    // 增加类别
    const sql = 'insert into ev_article_cate set ?'
    db.query(sql, req.body, (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc("新增文章分类失败")
      res.send({ code: 200, msg: '新增文章分类成功' })
    })
  })

}

exports.deleteCateById = (req, res) => {
  const sql = 'update ev_article_cate set deleted=0 where id=?'
  db.query(sql, req.params.id, (err, result) => {
    if (err) return res.cc(err)
    if (result.affectedRows !== 1) return res.cc("删除文章分类失败")
    res.send({ code: 200, msg: '删除文章分类成功' })
  })
}

exports.getCateById = (req, res) => {
  const sql = 'select * from ev_article_cate where deleted=1 and id=?'
  db.query(sql, req.params.id, (err, result) => {
    if (err) return res.cc(err)
    if (result.length === 0) return res.cc("查询文章分类失败")
    res.send({ code: 200, msg: '查询文章分类成功', data: result })
  })
}
exports.updateCateById = (req, res) => {
  // 查询分类名或别名是否被占用
  const sql = 'select * from ev_article_cate where id!=? and (name=? or alias=?)'
  const { name, alias, id } = req.body
  db.query(sql, [id, name, alias], (err, result) => {
    // sql语句失败
    if (err) return res.cc(err)
    // 分类名和别名查重
    if (result.length === 2) return res.cc('分类名和别名被占用，请重试')
    if (result.length === 1 && result[0].name === name && result[0].alias === alias) return res.cc('分类名和别名被占用，请重试')
    if (result.length === 1 && result[0].name === name) return res.cc('分类名被占用，请重试')
    if (result.length === 1 && result[0].alias === alias) return res.cc('别名被占用，请重试')
    // 修改类别
    const sql = 'update ev_article_cate set ? where id=?'
    db.query(sql, [req.body, id], (err, result) => {
      if (err) return res.cc(err)
      if (result.affectedRows !== 1) return res.cc("修改文章分类失败")
      res.send({ code: 200, msg: '修改文章分类成功' })
    })
  })

}