const express = require('express')
const router = express.Router()
const { getArticleCates, addArticleCates, deleteCateById, getCateById, updateCateById } = require('../router_handle/artcate')
const { validate_add_cates, validate_cate_id, validate_update_cate } = require('../schema/article')
// 获取文章分类
router.get('/cates', getArticleCates)
// 新增文章分类
router.post('/addCates', validate_add_cates, addArticleCates)
// 根据id删除文章分类
router.get('/deleteCate/:id', validate_cate_id, deleteCateById)
// 根据id修改文章分类
router.get('/cate/:id', validate_cate_id, getCateById)
// 根据id修改文章分类
router.post('/updateCate', validate_update_cate, updateCateById)

module.exports = router