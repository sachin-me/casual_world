const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = function (passport) {

  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    }, function (email, password, done) {
      
      User.findOne({ email: email }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(err, false);
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return done(err, false);
          if (!isMatch) return done(err, false);
          else return done(null, user);
        })
      })
    })
  )

  passport.serializeUser(function(user, done) {
    const id = user.id;
    done(null, id);
  })
  passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
      done(err, user);
    })
  })
}