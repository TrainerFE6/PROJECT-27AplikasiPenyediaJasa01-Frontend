var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors'); // Import the cors package

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var teknisiRouter = require('./routes/technician');
var orderRouter = require('./routes/order');

var app = express();

// Use the cors middleware
app.use(cors({
  origin: 'http://localhost:3000' // Allow requests from this origin
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/teknisi', teknisiRouter);
app.use('/order', orderRouter);

module.exports = app;
