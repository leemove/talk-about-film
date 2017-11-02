var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var postcssMiddleware = require('postcss-middleware');
var autoprefixer = require('autoprefixer');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var article = require('./routes/article')
var app = express();
mongoose.connect('mongodb://localhost:27017/talkfilm')
var db = mongoose.connection;
db.on('error', console.error.bind(console, '连接错误'));
db.once('open', function() {
  // we're connected!
  console.log('数据库连接成功!')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

//  只会处理.css的请求

app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true,
  response: false,
  outputStyle: 'extended',
  response: false
}));

app.use('/stylesheets', postcssMiddleware({
  plugins: [
    /* Plugins */
    autoprefixer({
      browsers: [
        "> 1%",
        "last 2 versions"
      ]
    })
  ],
  src: function(req) {
    let destPath = 'public/stylesheets'
    return path.join(destPath, req.url) 
  }
}));
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', index);
app.use('/users', users);
app.use('/article', article)
app.use('/superadmin', require('./routes/admin'))
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;