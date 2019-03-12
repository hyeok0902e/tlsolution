var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayout = require('express-ejs-layouts');
const { sequelize } = require("./models");
const session = require('express-session');
const logger2 = require('./logger');
const helmet = require('helmet');
const hpp = require('hpp')

var indexRouter = require('./routes/index'); // home.ejs로 render
var usersRouter = require('./routes/users');
var assembleRouter = require('./routes/assembles');
var admin_homeRouter = require('./routes/admin_home');
var admin_detailRouter = require('./routes/admin_detail');

var app = express();
sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 8001);

// express-ejs-layout settings
app.set('layout', 'layout');
app.set("layout extractScripts", true);
app.use(expressLayout);

if (process.env.NODE_ENV === 'production') {
  app.use(logger('combined'));  
  app.use(helmet());
  app.use(hpp());
} else {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
};
if (process.env.NODE_ENV === 'production') {
  sessionOption.proxy = true;
  // sessionOption.cookie.secure = true;
}
// app.use(session(sessionOption));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/assembles', assembleRouter);
app.use('/admin_home', admin_homeRouter);
app.use('/admin_detail', admin_detailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  logger2.info('hello');
  logger2.error(err.message);
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});

module.exports = app;
