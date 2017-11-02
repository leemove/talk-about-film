const Article = require('../model/article')
// const moment = require('moment')

const articleControll = {
  add (req, res) {
    Article.count().then(count => {
      req.body.index = count
      const article = new Article(req.body)
      return article.save()
    })
      .then(resD => {
        res.json({
          msg: 'ok',
          data: resD
        })
      })
      .catch(e => {
        res.status(500)
        res.json({msg: 'fail', e: e})
      })
  },
  index(req, res) {
      Article
      .findLastnDay(2)
      .then(articles => {
        // console.log(res, '查询结果')
        res.render('index', { title: '关于一部电影的全部' , articles});
      })
      .catch(e => console.log(e))
  }
}
module.exports = articleControll