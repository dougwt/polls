const passport = require('passport');
const googleStrategy = require('./passport').google;

passport.use(googleStrategy);

const withPassport = fn => (req, res) => {
  // call wrapped api route as innermost handler
  fn(req, res);
};

withPassport.passport = passport;

module.exports = withPassport;
