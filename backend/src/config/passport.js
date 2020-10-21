const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const OutlookStrategy = require('passport-outlook').Strategy;

const config = require('./config');
const { tokenTypes } = require('./tokens');
const { User } = require('../models');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};




const passportgoogle_login = new GoogleStrategy({
    clientID: '441231336198-5n46iarit3qn379p7fteq0sieaj7613t.apps.googleusercontent.com',
    clientSecret: 'GCyAXZJCxBuRuNwEGqjtAjX_',
    callbackURL: "http://localhost:8000/v1/auth/googleRedirect"
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
)

const passport_microsoft_login = new OutlookStrategy({
    clientID: '896a190c-be56-4e72-8430-45a98fca188f',
    clientSecret: 'jTNzLFUGoli5f5J1~CuI55RY645Gb~I__5',
    callbackURL: 'http://localhost:8000/v1/auth/microsoft-redirect',
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
);


const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
  passportgoogle_login,
  passport_microsoft_login
};
