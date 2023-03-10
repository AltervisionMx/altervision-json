const express = require('express')
const morgan = require('morgan')
const expressHandle = require('express-handlebars')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser');
const path = require('path');

const app = express()
const secret = '951asd357pom'

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', expressHandle({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs')

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded( { extended: false }));
app.use(cookieParser(secret));
app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize(undefined));
app.use(passport.session(undefined));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use(require('./routes/index.js'))

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;