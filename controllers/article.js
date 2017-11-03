const Article = require('../model/article')
// const moment = require('moment')
const moment = require('moment')

const util = require('../util')

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
    let articleToView = {}
    Article.findById({_id: req.params.id})
      .then(article => {
        articleToView = _.cloneDeep(article)
        articleToView.content = marked(articleToView.content)
        articleToView.firstImgSrc = util.getFirstSrc(articleToView.content)
        return Article.findOne({index : articleToView.index - 1})
          .then(previos  => {
            if (previos) {
              articleToView.prev = previos._id
            }
            return Article.findOne({index: articleToView.index + 1})
          })
          .then(next => {
            if (next) {
              articleToView.next = next._id
            }
            // console.log(articleToView.index, articleToView.prev, articleToView.next)
            res.render('article', articleToView)
          }).catch(e => {
            res.status = 502
            console.log(e)
            throw new Error('数据获取失败')
          })
      })
  }
}
module.exports = articleControll