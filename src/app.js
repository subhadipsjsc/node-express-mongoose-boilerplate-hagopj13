const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
/*================================================================
--- 1. added passportgoogle_login module
==================================================================*/
const { jwtStrategy, passportgoogle_login} = require('./config/passport');


const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

//const { passportgoogle_login } = require('./config/passport_social')

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication

/*====================================================================
--- 1. added serializeUser , deserializeUser , passportgoogle_login
======================================================================*/
app.use(passport.initialize());
passport.serializeUser(function(obj, done) { done(null, obj) })
passport.deserializeUser(function(obj, done) { done(null, obj) })
passport.use('jwt', jwtStrategy);
passport.use(passportgoogle_login);




// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

app.get('/',function (req, res) {
    ping = {status : 'live' , time :new Date().getTime() }
    res.status(200).send(ping);
})

// v1 api routes
app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
