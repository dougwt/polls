const { applyMiddleware } = require('micro-mw');
const passport = require('passport');
const withPassport = require('../../../lib/withPassport');
const withMongoose = require('../../../lib/withMongoose');

module.exports = applyMiddleware([withMongoose, withPassport], (req, res) => {
  passport.authenticate('google')(req, res, (...args) => {
    console.log('passport authenticated', args);
  });
});
