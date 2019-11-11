const Poll = require('../../models/Poll');
const { applyMiddleware, RequestError } = require('../../lib/applyMiddleware');
const withLogger = require('../../lib/withLogger');
const withMongoose = require('../../lib/withMongoose');
const withPassport = require('../../lib/withPassport');
const requireLogin = require('../../lib/requireLogin');

module.exports = applyMiddleware(
  [withLogger, withMongoose, withPassport, requireLogin],
  async (req, res) => {
    if (req.method !== 'GET') {
      throw new RequestError(404, 'Unsupported request method');
    }

    try {
      const polls = await Poll.find({});
      return res.json(polls);
    } catch (err) {
      throw new RequestError(500, 'Unable to query database');
    }
  }
);
