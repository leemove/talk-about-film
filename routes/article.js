var express = require('express');
var router = express.Router();
const articleCtr = require('../controllers/article')

router.get('/:id', function (req, res) {
  res.render('article', { title: '你眼中的世界' });
})

router.post('/new', articleCtr.add)

module.exports = router