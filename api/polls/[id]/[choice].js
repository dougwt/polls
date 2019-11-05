const { applyMiddleware } = require('micro-mw');
const withMongoose = require('../../../lib/withMongoose');
const withPassport = require('../../../lib/withPassport');
const requireLogin = require('../../../lib/requireLogin');

module.exports = applyMiddleware(
  [withMongoose, withPassport, requireLogin],
  (req, res) => {
    if (req.method !== 'POST') {
      return res.status(404).send({ error: 'Unsupported request method' });
    }
  }
);
