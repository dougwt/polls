const mongoose = require('mongoose');
const appConfig = require('../../lib/appConfig');
const Poll = require('../../models/Poll');

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    return res.status(404).send({ error: 'Unsupported request method' });
  }

  mongoose.Promise = global.Promise;
  mongoose.connect(appConfig.db.mongoURI, { useNewUrlParser: true });

  try {
    Poll.find({}).then(polls => {
      return res.send(polls);
    });
  } catch (err) {
    console.error(`Unable to connect to database: ${err}`);
  }
};
