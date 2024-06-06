var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var teknisiRouter = require('./routes/technician');
var orderRouter = require('./routes/order');
var catagoriRouter = require('./routes/catagori');

var app = express();

// Middleware CORS untuk mengizinkan permintaan dari domain lain
app.use(cors({
  origin: 'http://localhost:3000', // Gantilah ini dengan domain frontend Anda jika berbeda
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
  allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
  credentials: true // Jika Anda memerlukan pengelolaan kredensial seperti cookies
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
app.use('/kategori', catagoriRouter);

module.exports = app;
