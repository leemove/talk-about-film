const Article = require('../model/article')
// const moment = require('moment')
const moment = require('moment')
var marked = require('marked');
const _ = require('lodash')
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
        // console.log(res, '查询结果')\
        let articlesToView = articles.map(item => {
          let htmlContent = marked(item.content)
          let imgReg = /<img.*?(?:>|\/>)/gi;
          let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          let arr = htmlContent.match(imgReg);
          let firstImgSrc = ''
          if (arr) {
            let srcs = arr[0].match(srcReg)
            if (srcs) {
              firstImgSrc = srcs[0].slice(5, -1) || ''
            }
          }
          return {
            name: item.name,
            title: item.title,
            time: moment(item.time).format('MMM Do YY'),
            content: htmlContent,
            author: item.author,
            index: item.index,
            firstImgSrc,
            _id: item._id
          }
        })
        res.render('index', { title: '关于一部电影的全部' , articles:articlesToView , firstArticle: articlesToView[0]});
      })
      .catch(e => console.log(e))
  },
  detail (req, res) {
    Article.findById({_id: req.params.id})
      .then(article => {
        let articleToView = _.cloneDeep(article)
        articleToView.content = marked(articleToView.content)
        articleToView.firstImgSrc = 
        res.render('article', articleToView)
      })
  }
}
module.exports = articleControll