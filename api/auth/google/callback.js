const passport = require('passport');
const { applyMiddleware } = require('../../../lib/applyMiddleware');
const logger = require('../../../lib/logger');
const withLogger = require('../../../lib/withLogger');
const withPassport = require('../../../lib/withPassport');
const withMongoose = require('../../../lib/withMongoose');

module.exports = applyMiddleware(
  [withLogger, withMongoose, withPassport],
  (req, res) => {
    logger.debug('you reached the callback URI', { id: req.id });
    passport.authenticate('google')(req, res, () => {
      res.redirect('/polls');
    });
  }
);
