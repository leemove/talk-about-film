var express = require('express');
var router = express.Router();
const articleCont = require('../controllers/article')
/* GET home page. */
router.get('/', articleCont.index);

module.exports = router;
