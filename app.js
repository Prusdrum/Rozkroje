const express = require('express');
const configureApp = require('./express');

const index = require('./routes/index');
const division = require('./routes/webapi/division');

const app = express();
configureApp(app);

//set routes
app.use('/', index);
app.use('/webapi/division', division);

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
