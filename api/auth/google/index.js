const passport = require('passport');
const { applyMiddleware } = require('../../../lib/applyMiddleware');
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
