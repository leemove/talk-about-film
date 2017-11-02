const Article = require('../model/article')
// const moment = require('moment')

const articleControll = {
  add (req, res) {
    const article = new Article(req.body)
    article.save()
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
  }
}
module.exports = articleControll