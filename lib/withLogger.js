const redirect = require('micro-redirect');
const uuid = require('uuid/v4');
const logger = require('./logger');

function captureResponseBody(response) {
  response.body = null;
  response.redirectPath = undefined;

  // wrap res.json() to store data on res object when called
  const oldJSON = response.json;
  response.json = data => {
    response.body = data;
    return oldJSON.call(response, data);
  };

  // wrap res.redirect() to store data on res object when called
  if (!response.redirect) {
    // Monkey-patch res.redirect to emulate express.js's res.redirect,
    // since it doesn't exist in micro. default redirect status is 302
    // as it is in express. https://expressjs.com/en/api.html#res.redirect
    response.redirect = location => redirect(response, 302, location);
  }
  const oldRedirect = response.redirect;
  response.redirect = location => {
    response.redirectPath = location;
    return oldRedirect.call(response, location);
  };
}

async function withLogger(req, res) {
  const requestStart = Date.now();
  req.id = uuid();
  logger.debug('executing withLogger middleware', { id: req.id });

  // Capture response body and store it at res.body for later use
  captureResponseBody(res);

  // Log error messages
  let errorMessage = null;
  req.on('error', error => {
    errorMessage = error.message;
  });

  res.on('finish', () => {
    const { id, url, method, query, body } = req;
    const userID = req.user ? req.user._id : null;

    logger.info('Incoming request', {
      request: {
        url,
        method,
        query,
        body
      },
      response: {
        statusCode: res.statusCode,
        statusMessage: res.statusMessage,
        headers: res.headers,
        body: res.body,
        redirect: res.redirectPath
      },
      id,
      userID,
      host: req.socket.remoteAddress,
      errorMessage,
      timestamp: Date.now(),
      processingTime: Date.now() - requestStart
    });
    logger.debug('Finished request', { id });
  });
}

module.exports = withLogger;
