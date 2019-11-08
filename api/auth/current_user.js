const { applyMiddleware } = require('micro-mw');
const withLogger = require('../../lib/withLogger');
const withPassport = require('../../lib/withPassport');
const withMongoose = require('../../lib/withMongoose');

module.exports = applyMiddleware(
  [withLogger, withMongoose, withPassport],
  (req, res) => {
    res.json(req.user);
  }
);
