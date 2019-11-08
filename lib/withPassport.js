const passport = require('passport');
const cookieSession = require('cookie-session');
const redirect = require('micro-redirect');
const googleStrategy = require('./passport/googleStrategy');
const User = require('../models/User');
const appConfig = require('./appConfig');
const logger = require('./logger');

passport.use(googleStrategy);

passport.serializeUser(({ id }, done) => {
  done(null, id);
});

passport.deserializeUser(async (id, done) => {
  let user;

  try {
    user = await User.findById(id);
  } catch (err) {
    done(new Error(`User not found: ${user}`));
  }

  done(null, user);
});

async function withPassport(req, res) {
  logger.debug('executing withPassport middleware');
  if (!res.redirect) {
    // passport.js needs res.redirect:
    // https://github.com/jaredhanson/passport/blob/1c8ede/lib/middleware/authenticate.js#L261
    // Monkey-patch res.redirect to emulate express.js's res.redirect,
    // since it doesn't exist in micro. default redirect status is 302
    // as it is in express. https://expressjs.com/en/api.html#res.redirect
    res.redirect = location => redirect(res, 302, location);
  }

  // Initialize Passport and restore authentication state, if any, from the
  // session. This nesting of middleware handlers basically does what app.use(passport.initialize())
  // does in express.
  await new Promise((resolve, reject) => {
    try {
      cookieSession({
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        keys: [appConfig.session.cookieKey]
      })(req, res, () =>
        passport.initialize()(req, res, () =>
          passport.session()(req, res, () => {
            logger.debug('it initialized the passport session');
            resolve(true);
          })
        )
      );
    } catch (err) {
      reject(new Error('Unable to initialize passport session'));
    }
  });
}

module.exports = withPassport;
