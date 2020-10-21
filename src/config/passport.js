const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


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
    clientID: 'xxxxxxxx.apps.googleusercontent.com',
    clientSecret: 'xxxxxxxxxxxxxxxxxxx_',
    callbackURL: "http://localhost:8000/v1/auth/googleRedirect"
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
)


const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
  passportgoogle_login
};
