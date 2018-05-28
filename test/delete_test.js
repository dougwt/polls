const assert = require('assert');
const User = require('../models/User');
const Poll = require('../models/Poll');

describe('Deleting records', () => {
  let user;
  let poll;

  beforeEach(done => {
    user = new User({ googleId: 'sample-id' });
    user
      .save()
      .then(() => {
        poll = new Poll({
          owner: user,
          question: 'Who is your favorite Starfleet captain?',
          choices: [
            {
              text: 'Kirk (TOS)',
              votes: 5
            },
            {
              text: 'Picard (TNG)',
              votes: 4
            },
            {
              text: 'Sisko (DS9)',
              votes: 3
            },
            {
              text: 'Janeway (Voyager)',
              votes: 2
            },
            {
              text: 'Archer (Enterprise)',
              votes: 1
            },
            {
              text: 'Lorca (Discovery)',
              votes: 0
            }
          ],
          respondents: []
        });

        poll.save().then(() => {
          assert(!poll.isNew);
          done();
        });
      })
      .catch(err => console.log(err));
  });

  it('model instance remove', done => {
    poll
      .remove()
      .then(() =>
        Poll.findOne({ question: 'Who is your favorite Starfleet captain?' })
      )
      .then(result => {
        assert(result === null);
        done();
      });
  });

  it('class method remove', done => {
    Poll.remove({ question: 'Who is your favorite Starfleet captain?' })
      .then(() =>
        Poll.findOne({ question: 'Who is your favorite Starfleet captain?' })
      )
      .then(result => {
        assert(result === null);
        done();
      });
  });

  it('class method findOneAndRemove', done => {
    Poll.findOneAndRemove({
      question: 'Who is your favorite Starfleet captain?'
    })
      .then(() =>
        Poll.findOne({ question: 'Who is your favorite Starfleet captain?' })
      )
      .then(result => {
        assert(result === null);
        done();
      });
  });

  it('class method findByIdAndRemove', done => {
    Poll.findByIdAndRemove(poll._id)
      .then(() =>
        Poll.findOne({ question: 'Who is your favorite Starfleet captain?' })
      )
      .then(result => {
        assert(result === null);
        done();
      });
  });
});
