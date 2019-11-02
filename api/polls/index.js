const { applyMiddleware } = require('micro-mw');
const Poll = require('../../models/Poll');
const withMongoose = require('../../lib/withMongoose');
const withPassport = require('../../lib/withPassport');
const requireLogin = require('../../lib/requireLogin');

module.exports = applyMiddleware(
  [withMongoose, withPassport, requireLogin],
  async (req, res) => {
    console.log('sending response');
    if (req.method !== 'GET') {
      return res.status(404).send({ error: 'Unsupported request method' });
    }

    try {
      const polls = await Poll.find({});
      return res.send(polls);
    } catch (err) {
      return res.status(500).send({ error: '`Unable to query database' });
    }
  }
);
