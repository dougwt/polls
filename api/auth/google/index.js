const { applyMiddleware } = require('micro-mw');
const passport = require('passport');
const logger = require('../../../lib/logger');
const withLogger = require('../../../lib/withLogger');
const withPassport = require('../../../lib/withPassport');
const withMongoose = require('../../../lib/withMongoose');

module.exports = applyMiddleware(
  [withLogger, withMongoose, withPassport],
  (req, res) => {
    passport.authenticate('google')(req, res, (...args) => {
      logger.debug('passport authenticated', args);
    });
  }
);
