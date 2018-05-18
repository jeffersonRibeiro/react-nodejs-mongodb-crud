const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const secret = require('./index').auth.secret;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
    User.findById(jwt_payload.user)
      .then(user => {
        if(!!user){
          return done(null, user);
        }

        return done(null, false);
      })
      .catch(err => {
        throw new Error(err)
      });
  }));
}