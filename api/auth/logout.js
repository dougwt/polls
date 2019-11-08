const { applyMiddleware } = require('micro-mw');
const withLogger = require('../../lib/withLogger');
const withPassport = require('../../lib/withPassport');
const withMongoose = require('../../lib/withMongoose');

module.exports = applyMiddleware(
  [withLogger, withMongoose, withPassport],
  (req, res) => {
    // Logging out of Passport removes the user info from req object,
    // so let's store it and restore it afterwards so that when we
    // log the response, we still have access to the userID.
    const userBackup = req.user;
    req.logout();
    req.user = userBackup;

    res.redirect('/');
  }
);
