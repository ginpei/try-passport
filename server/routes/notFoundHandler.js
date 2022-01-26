const createError = require('http-errors');

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
 module.exports = (req, res, next) => next(createError(404));
