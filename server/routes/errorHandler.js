/**
 * Do not remove `next` because Express counts arguments to change behavior.
 * @param {Error} error
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
module.exports = function(error, req, res, next) {
  res.locals.message = error.message;

  // hide details in production
  const isDev = req.app.get('env') === 'development';
  res.locals.error = isDev ? error : {};

  res.status(error.status || 500);
  res.render('error');
};
