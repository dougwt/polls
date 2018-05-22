const assert = require('assert');
const User = require('../models/User');
const Poll = require('../models/Poll');

describe('Creating records', () => {
  let user;

  beforeEach((done) => {
    user = new User({ googleId: 'sample-id' });
    user.save()
      .then(() => done())
      .catch((err) => console.log(err));
  })

  it('saves a poll', (done) => {
    const poll = new Poll({
      owner: user,
      question: 'Who is your favorite Starfleet captain?',
      choices: [
        {
          text: 'Kirk (TOS)',
          votes: 5
        }, {
          text: 'Picard (TNG)',
          votes: 4
        }, {
          text: 'Sisko (DS9)',
          votes: 3
        }, {
          text: 'Janeway (Voyager)',
          votes: 2
        }, {
          text: 'Archer (Enterprise)',
          votes: 1
        }, {
          text: 'Lorca (Discovery)',
          votes: 0
        }
      ],
      respondents: []
    });

    poll.save()
      .then(() => {
        assert(!poll.isNew);
        done();
      });
  });
});
