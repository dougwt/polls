const mongoose = require('mongoose');
const { Schema } = mongoose;

const choiceSchema = new Schema({
  text: String,
  votes: Number
}, {
  usePushEach: true
});

module.exports = choiceSchema;
