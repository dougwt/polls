const passport = require('passport');
const googleStrategy = require('./passport').googleStrategy;

passport.use(googleStrategy);

// middleware to wrap api/auth handlers
const withPassport = fn => (req, res) => {
  // call wrapped api route as innermost handler
  fn(req, res);
};

withPassport.passport = passport;

module.exports = withPassport;
