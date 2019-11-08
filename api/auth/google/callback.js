const { applyMiddleware } = require('micro-mw');
const passport = require('passport');
const withPassport = require('../../../lib/withPassport');
const withMongoose = require('../../../lib/withMongoose');
const logger = require('../../../lib/logger');

module.exports = applyMiddleware([withMongoose, withPassport], (req, res) => {
  logger.debug('you reached the callback URI', { id: req.id });
  passport.authenticate('google')(req, res, () => {
    res.redirect('/polls');
  });
});
