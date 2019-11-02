const { applyMiddleware } = require('micro-mw');
const withPassport = require('../../../lib/withPassport');
const passport = withPassport.passport;

module.exports = applyMiddleware([withPassport], async (req, res) => {
  passport.authenticate('google')(req, res, (...args) => {
    console.log('auth callback', args);
    return true;
  });
});
