const Poll = require('../../models/Poll');

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    return res.status(404).send({ error: 'Unsupported request method' });
  }

  Poll.find({}).then(polls => {
    return res.send(polls);
  });
};
