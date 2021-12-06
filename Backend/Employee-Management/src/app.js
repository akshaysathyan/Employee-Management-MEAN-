var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
const connectDatabase = require("./database/employeeData");
import cors from "cors"





// var usersRouter = require('./routes/users');
// var leavesRouter= require('./routes/leaves')
// var indexRouter = require('./routes/index');
import usersRouter from './routes/users'
import indexRouter from './routes/index'
import leavesRouter from './routes/leaves'
import loginRouter from './routes/login'
dotenv.config( { path : 'config.env'} )

var app = express();
app.use(cors())
dotenv.config()
//mongoconnection
connectDatabase()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}))

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/leaves',leavesRouter);
app.use('/login', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err.message)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
