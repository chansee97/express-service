// 导入express
const express = require('express')
const app = express()
// const joi = require('joi')

// 跨域中间价
const core = require('cors')
app.use(core())
// json解析中间件
app.use(express.json())
// 表单解析中间件
app.use(express.urlencoded())

// 挂载全局错误消息中间件
app.use((req, res, next) => {
  // 默认错误码500
  res.cc = (err, code = 500) => {
    res.send({
      code,
      // 错误对象或错误字符串
      msg: err instanceof Error ? err.message : err
    })
  }
  next()
})

// token解析中间件
const { jwtSecretKey } = require('./config')
const { expressjwt } = require("express-jwt")
app.use(expressjwt({ secret: jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api\//] }))

// 导入并使用路由
// 登录注册路由
app.use('/api', require('./router/user'))
//用户管理路由
app.use('/my', require('./router/userinfo'))
// 文章分类路由
app.use('/article', require('./router/artcate'))


// 错误级别中间件
app.use((err, req, res, next) => {
  // if (err instanceof joi.ValidationError) return res.cc(err)
  // 身份失败错误
  if (err.name === 'UnauthorizedError') return res.cc('身份失效')
  res.cc(err)
})

app.listen(3007, () => {
  console.log('api server runnig at http://127.0.0.1:3007')
})