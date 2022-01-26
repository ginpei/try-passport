const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const users = require('../usersDb');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('session'));

passport.use(new LocalStrategy(function verify(username, password, cb) {
  const user = users.find((v) => v.username === username);
  if (!user || user.password !== password) {
    cb(null, null);
    return;
  }

  // pass to deserializer
  cb(null, user);
}));

// covert user record from DB to passport data
// called after `req.login()` or in `passport.authenticate()`
passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

// convert user data on passport to session (`req.user`)
// called on each request if logged in
passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});  
