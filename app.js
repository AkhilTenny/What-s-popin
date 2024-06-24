var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongooseFile = require('./config/connection.js')

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var express     = require( 'express');
const session = require('express-session');
const bodyParser = require('body-parser');
var hbs         = require( 'express-handlebars' );


var app = express();

var HBS = hbs.create( { 
  extname: 'hbs', 
  defaultLayout: 'layout', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) ;
app.engine('hbs',HBS.engine)

//connect to db
mongooseFile.connectDB()

// Session configuration
app.use(session({
  secret: 'MI_Key',
  resave: true,
  saveUninitialized: true, // Example: session expires in 24 hours
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
