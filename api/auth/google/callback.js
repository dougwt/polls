const { applyMiddleware } = require('micro-mw');
const passport = require('passport');
const withPassport = require('../../../lib/withPassport');
const withMongoose = require('../../../lib/withMongoose');

module.exports = applyMiddleware([withMongoose, withPassport], (req, res) => {
  console.log('you reached the callback URI');
  passport.authenticate('google')(req, res, (...args) => {
    res.redirect('/polls');
  });
});
