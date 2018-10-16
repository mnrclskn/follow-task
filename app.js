const createError = require('http-errors');
const express = require('express');
const path = require('path');
//const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

//DB Connection
const connectionDB = require('./helper/db_connection')();

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// Express Session Middleware
app.use(session({
    secret: 'your secret',
    resave: true,
    saveUninitialized: true
}));

// Passport Config
require('./helper/passport')(passport);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next)=>{
    res.locals.user = req.user || null;
    next();
});

//Router
const taskRouter = require('./routes/task');
const customersRouter = require('./routes/customers');
const technicianRouter = require('./routes/technician');
const userRouter = require('./routes/users');
//routes files
app.use('/task', taskRouter);
app.use('/customers', customersRouter);
app.use('/technician', technicianRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
