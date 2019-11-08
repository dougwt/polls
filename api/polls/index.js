const { applyMiddleware } = require('micro-mw');
const Poll = require('../../models/Poll');
const withLogger = require('../../lib/withLogger');
const withMongoose = require('../../lib/withMongoose');
const withPassport = require('../../lib/withPassport');
const requireLogin = require('../../lib/requireLogin');

module.exports = applyMiddleware(
  [withLogger, withMongoose, withPassport, requireLogin],
  async (req, res) => {
    if (req.method !== 'GET') {
      return res.status(404).json({ error: 'Unsupported request method' });
    }

    try {
      const polls = await Poll.find({});
      return res.json(polls);
    } catch (err) {
      return res.status(500).json({ error: '`Unable to query database' });
    }
  }
);
