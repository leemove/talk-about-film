const mongoose = require('mongoose')

var articleSchema = mongoose.Schema({
  name: String,
  title: String,
  time: Date,
  content: String,
  author: String,
  index: Number
})
articleSchema.index({ time: 1 });
articleSchema.set('autoIndex', true)
articleSchema.statics.findLastnDay = function (n) {
  return this.find()
    .sort({
      time: -1
    })
    .limit(n)
    .exec()
}
articleSchema.statics.getId = function (n) {
  return this.find().count().exec()
}

var Article = mongoose.model('Article', articleSchema)

module.exports = Article