const createError = require('http-errors');
const express = require('express');
const passport = require('passport');
const users = require('../usersDb');

const router = express.Router();

// authenticate by LocalStrategy registered to `passport.use()`
router.post('/login', passport.authenticate('local', {
  failureMessage: true,
  failureRedirect: '/?failed',
  successReturnToOrRedirect: '/?ok',
}));

router.post('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

router.post('/signup', function(req, res, next) {
  const { password, username} = req.body;

  let newUser;
  try {
    newUser = registerNewUser(username, password);
  } catch (error) {
    next(error);
    return;
  }

  if (!newUser) {
    next(new Error('[Bug]'))
    return;
  }

  // complete login too
  req.login(newUser, function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;

function registerNewUser(username, password) {
  // fail if already exists
  if (users.some((v) => v.username === username)) {
    throw createError(400, 'Username taken');
  }

  // create data record
  const id = Math.random().toFixed(32).slice(2);
  const newUser = {
    id,
    password,
    username,
  };

  // save (insert)
  users.push(newUser);

  return newUser;
}