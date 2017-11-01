var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res) {
  console.log(req.id)
  res.render('index', { title: '关于一部电影的全部' });
})

module.exports = router