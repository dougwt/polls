const { applyMiddleware } = require('micro-mw');
const Poll = require('../../models/Poll');
const withMongoose = require('../../lib/withMongoose');

module.exports = applyMiddleware([withMongoose], async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(404).send({ error: 'Unsupported request method' });
  }

  try {
    const polls = await Poll.find({});
    res.send(polls);
  } catch (err) {
    console.error(`Unable to query database: ${err}`);
  }
});
