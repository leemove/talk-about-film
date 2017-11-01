var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('admin', {title: '后台管理'})
})
router.get('/newarticle', function (req, res) {
  res.render('newarticle', {title: '新建文章'})
})

module.exports = router