const GoogleStrategy = require('passport-google-oauth20');
const User = require('../../models/User');
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
  async (accessToken, refreshToken, googleProfile, done) => {
    // Right now, the user's Github profile is supplied as the user
    // record. In a production-quality application, the Github profile should
    // be associated with an app-specific user record in app persistence,
    // which allows for account linking and authentication with other identity providers.

    // Upsert user here
    console.log('passport callback function');
    // console.log(googleProfile);
    // console.log(accessToken, refreshToken, googleProfile);

    let user;

    try {
      const existingUser = await User.findOne({ googleId: googleProfile.id });

      if (existingUser) {
        user = existingUser;
      } else {
        user = await new User({ googleId: googleProfile.id }).save();
      }
    } catch (err) {
      console.error(`Unable to connect to database: ${err}`);
    }

    done(null, user);
  }
);

module.exports = googleStrategy;
