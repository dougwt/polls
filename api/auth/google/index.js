const { applyMiddleware } = require('micro-mw');
const passport = require('passport');
const withPassport = require('../../../lib/withPassport');
const withMongoose = require('../../../lib/withMongoose');
const logger = require('../../../lib/logger');

module.exports = applyMiddleware([withMongoose, withPassport], (req, res) => {
  passport.authenticate('google')(req, res, (...args) => {
    logger.debug('passport authenticated', args);
  });
});
