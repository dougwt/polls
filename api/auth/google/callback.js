const { applyMiddleware } = require('micro-mw');
const passport = require('passport');
const withPassport = require('../../../lib/withPassport');

module.exports = applyMiddleware([withPassport], async (req, res) => {
  passport.authenticate('google')(req, res, (...args) => {
    console.log('auth callback', args);
    return true;
  });
});
