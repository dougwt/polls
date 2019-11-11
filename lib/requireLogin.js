const { RequestError } = require('./applyMiddleware');

function requireLogin(req, res) {
  if (!req.user) {
    throw new RequestError(401, 'You are unauthorized to make this request.');
  }
}

module.exports = requireLogin;
