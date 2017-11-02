const mongoose = require('mongoose')

var articleSchema = mongoose.Schema({
  name: String,
  title: String,
  time: Date,
  content: String
})

var Article = mongoose.model('Article', articleSchema)

module.exports = Article