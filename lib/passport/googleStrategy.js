const GoogleStrategy = require('passport-google-oauth20');
const appConfig = require('../appConfig');

// STATICALLY configure the Github strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Github API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be exposed in the request as `req.user`
// in api handlers after authentication.
const googleStrategy = new GoogleStrategy(
  appConfig.google,
  (accessToken, refreshToken, googleProfile, done) => {
    // Right now, the user's Github profile is supplied as the user
    // record. In a production-quality application, the Github profile should
    // be associated with an app-specific user record in app persistence,
    // which allows for account linking and authentication with other identity providers.

    // Upsert user here
    console.log('passport callback function');
    // console.log(accessToken, refreshToken, googleProfile);
    console.log(googleProfile);

    // see https://github.com/jaredhanson/passport-github/blob/master/lib/strategy.js#L40
    // see https://gitlab.com/andycunn/canvass/blob/f3f03859b3de66f30d7703a4c5d2f44f7c724f67/api/app.js#L118
    // for an example
    done(null, googleProfile);
  }
);

module.exports = googleStrategy;
