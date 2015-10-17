var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passwordHash = require('password-hash');
var passport = require('passport');
var localStrategy = require('passport-local' ).Strategy;
var expressSession = require('express-session');

mongoose.connect('mongodb://localhost/users');
//MODELS CRUD BY SCAFFOLDMEANHEROIC
var User = require('./models/Users.js');
//ROUTES CRUD BY SCAFFOLDMEANHEROIC
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

//Call cookie

app.get('/cookie', function(req, res) {
       /*req.session.visitCount = req.session.visitCount ? req.session.visitCount + 1 : 1;
       res.send('You have visited this page ' + req.session.visitCount + ' times '+req.session.us);*/
       res.json({comp:req.session.us,check:req.session.check,user:{id:req.session.idd,username: req.session.name,rol:req.session.rol}});
 });

//Call cookie end

//Init passport
app.use(passport.initialize());
app.use(passport.session());
//configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//API ROUTES CRUD BY SCAFFOLDMEANHEROIC
app.use('/', routes);
app.use('/api', users);

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
