var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var compileChapel = require('./routes/compileChapel');
var process = require('./routes/process');
var test = require('./routes/test');

var app = express();


// var MongoClient = require('mongodb').MongoClient
//     , assert = require('assert');

// Connection URL
// var url = 'mongodb://localhost:27017/compile_online';

// Use connect method to connect to the server
// MongoClient.connect(url, function(err, db) {
//     assert.equal(null, err);
//     console.log("Connected successfully to server");
//
//     db.close();
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/')));


app.use('/', index);
app.use('/users', users);
app.use('/compile', compileChapel);
app.use('/process', process);
app.use('/test', test);
app.get('*', function(req, res){
  res.render('404', {message: '404 Not Found'});
});
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('404');
// });
//
module.exports = app;
