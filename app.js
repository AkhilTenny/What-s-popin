var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongooseFile = require('./config/connection.js')
const passport = require('passport');
const port = process.env.PORT || 5000; //Line 3



var app = express();



var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var authRouter = require('./routes/auth');
var postRouter = require('./routes/post');
var {router:chatRouter,socketapi} = require('./routes/chat');




var express     = require( 'express');
const session = require('express-session');
const bodyParser = require('body-parser');
var hbs         = require( 'express-handlebars' );
const MongoStore = require('connect-mongo');



// Middleware to parse JSON bodies
app.use(bodyParser.json());

var HBS = hbs.create( { 
  extname: 'hbs', 
  defaultLayout: 'layout', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) ;
app.engine('hbs',HBS.engine)

//connect to db
mongooseFile.connectDB()

// Use passport.initialize() before routes

app.use(passport.initialize()); 


// Session configuration
app.use(session({
  secret: 'MY_Key',
  resave: true,
  saveUninitialized: true, 
  store:MongoStore.create({
    mongoUrl:"mongodb://localhost:27017/WhatsPopin",
    collectionName:"session"
  })
}));

app.use(express.json());

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
app.use('/',authRouter);
app.use('/',postRouter);
app.use('/chat',chatRouter)


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
