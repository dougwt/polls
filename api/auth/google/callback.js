const withPassport = require('../../../lib/withPassport');
const passport = withPassport.passport;

function handler(req, res) {
  passport.authenticate('google')(req, res, (...args) => {
    console.log('auth callback', args);
    return true;
  });
}

export default withPassport(handler);
