const { applyMiddleware, createSet } = require('micro-mw');
const logger = require('./logger');

class RequestError extends Error {
  constructor(status = 500, message, ...args) {
    super(...args);
    this.status = status;
    this.message = message;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, RequestError);
    }

    this.name = 'RequestError';
  }
}

function errorHandler(req, res, err) {
  const status = err.status || 500;
  req.error = err;
  logger.error(err);
  res.status(status).json({ error: err.message });
}
createSet('errorHandler', [errorHandler]);

module.exports = { applyMiddleware, RequestError };