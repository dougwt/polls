const assert = require('assert');
const User = require('../models/User');
const Poll = require('../models/Poll');

describe('Reading records', () => {
  let alex, maria;
  let poll;

  beforeEach((done) => {
    alex = new User({ googleId: 'alex' });
    maria = new User({ googleId: 'maria' });
    Promise.all([alex.save(), maria.save()])
      .then(() => {
        poll1 = new Poll({
          owner: alex,
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

        poll2 = new Poll({
          owner: maria,
          question: 'Who is your favorite Star Wars captain?',
          choices: [
            {
              text: 'Han Solo',
              votes: 5
            }, {
              text: 'Wedge Antilles',
              votes: 4
            }, {
              text: 'Lando Calrissian',
              votes: 3
            }, {
              text: 'Phasma',
              votes: 2
            }
          ],
          respondents: []
        });

        Promise.all([poll1.save(), poll2.save()])
          .then(() => {
            assert(!poll1.isNew);
            assert(!poll2.isNew);
            done();
          });
      })
      .catch((err) => console.log(err));
  })

  it('finds all polls created by Maria', (done) => {
    Poll.find({ owner: maria })
      .then((polls) => {
        assert(polls.length === 1);
        assert(polls[0].owner.equals(maria._id));
        done();
      });
  });

  it('finds a poll with a particular id', (done) => {
    Poll.findOne({ _id: poll1._id })
      .then((poll) => {
        assert(poll.question === 'Who is your favorite Starfleet captain?');
        done();
      });
  });
});
