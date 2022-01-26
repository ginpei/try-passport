const express = require('express');
const path = require('path');
const session = require('express-session');
const csrf = require('csurf');
const logger = require('morgan');

const router = express.Router();
module.exports = router;

router.use(logger('dev'));

router.use(express.urlencoded({ extended: false }));
router.use(express.static(path.join(__dirname, '../../public')));
router.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'keyboard cat',
}));

router.use(csrf());
router.use(function(req, res, next) {
  res.locals.csrfToken = req.csrfToken();
  next();
});
