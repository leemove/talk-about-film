var express = require('express');
var router = express.Router();

router.get('/:id', function (req, res) {
  res.render('article', { title: '你眼中的世界' });
})

module.exports = router