var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var pug = require('pug');
var passport = require('passport');
// var routes = require('./routes/index');
var routes = require('./routes/site.controller')(passport);
var users = require('./routes/users');
var auth = require('./routes/auth');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');
// app.set('view options', { layout: true });

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// ****************************************************************************
// Configuring Passport
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
// var initPassport = require('./passport/init'); // long version
// initPassport(passport);
require('./passport/init')(passport); // short version
// ****************************************************************************

// routes
app.use('/', routes);
app.get('/posts', api.posts);
app.use('/api/v1/auth', auth);
app.get('/posts/:id', api.edit_post);
app.put('/posts/:id', api.update_post);
app.post('/posts', api.add_post);
app.delete('/posts/:id', api.delete_post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
