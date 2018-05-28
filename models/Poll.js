const mongoose = require('mongoose');
const { Schema } = mongoose;

const choiceSchema = require('./Choice');

const pollSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    question: String,
    choices: [choiceSchema],
    respondents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    usePushEach: true
  }
);

const Poll = mongoose.model('polls', pollSchema);

module.exports = Poll;
