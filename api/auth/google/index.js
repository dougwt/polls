const withPassport = require('../../../lib/withPassport');
const passport = withPassport.passport;

function handler(req, res) {
  passport.authenticate('google')(req, res, (...args) => {
    console.log('passport authenticated', args);
  });
}

export default withPassport(handler);
