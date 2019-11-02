const mongoose = require('mongoose');
const appConfig = require('./appConfig');

async function withMongoose(req, res) {
  mongoose.Promise = global.Promise;
  try {
    await mongoose.connect(appConfig.db.mongoURI, appConfig.db.mongoOptions);
    console.log('mongoose connected');
  } catch (err) {
    // TODO: handle error better
    res.status(500).send({ error: 'Unable to connect to database' });
  }

  mongoose.connection.on('error', err => {
    // TODO: handle error better
    console.error(err);
    res.status(500).send({ error: 'Connection to database failed' });
  });
}

module.exports = withMongoose;
