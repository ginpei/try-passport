const express = require('express');
const path = require('path');
const miscSetup = require('./setup/miscSetup');
const passportSetup = require('./setup/passportSetup');
const indexRouter = require('./routes/main');
const authRouter = require('./routes/auth');
const notFoundHandler = require('./routes/notFoundHandler');
const errorHandler = require('./routes/errorHandler');

const app = express();

// setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(miscSetup);
app.use(passportSetup);

// routing
app.use(indexRouter);
app.use(authRouter);

// fallbacks (must be at the end)
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
