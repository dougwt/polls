const { applyMiddleware } = require('micro-mw');
const withPassport = require('../../lib/withPassport');
const withMongoose = require('../../lib/withMongoose');

module.exports = applyMiddleware([withMongoose, withPassport], (req, res) => {
  res.json(req.user);
});
