var express = require('express');
var router = express.Router();
const articleCtr = require('../controllers/article')

router.get('/:id', articleCtr.detail)

router.post('/new', articleCtr.add)

module.exports = router