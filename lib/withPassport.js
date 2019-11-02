const passport = require('passport');
const googleStrategy = require('./passport/googleStrategy');

async function withPassport(req, res) {
  passport.use(googleStrategy);
}
withPassport.passport = passport;

module.exports = withPassport;
