const { applyMiddleware } = require('micro-mw');
const withPassport = require('../../lib/withPassport');
const withMongoose = require('../../lib/withMongoose');

module.exports = applyMiddleware([withMongoose, withPassport], (req, res) => {
  console.log('user logged out');
  req.logout();
  res.redirect('/');
});
