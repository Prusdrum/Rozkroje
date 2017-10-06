const express = require('express');
const configureExpressApp = require('./configureExpressApp');
const configureRoutes = require('./configureRoutes');
const appConfig = require('./config/appConfig');

const app = express();
configureExpressApp(app);
configureRoutes(app, appConfig);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.error = err;
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
