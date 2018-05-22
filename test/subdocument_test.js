const assert = require('assert');
const User = require('../models/User');
const Poll = require('../models/Poll');


describe('Subdocuments', () => {
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

  it('can add subdocuments to an existing record', (done) => {
    Poll.findOne({ question: 'Who is your favorite Star Wars captain?' })
      .then((poll) => {
        poll.choices.push({ text: 'Phasma', votes: 0 });
        return poll.save();
      })
      .then(() => Poll.findOne({ question: 'Who is your favorite Star Wars captain?' }))
      .then((poll) => {
        assert(poll.choices.length === 4);
        assert(poll.choices[3].text === 'Phasma');
        done();
      })
  });

  it('can remove an existing subdocument', (done) => {
    Poll.findOne({ question: 'Who is your favorite Star Wars captain?' })
      .then((poll) => {
        poll.choices[0].remove();
        return poll.save();
      })
      .then(() => Poll.findOne({ question: 'Who is your favorite Star Wars captain?' }))
      .then((poll) => {
        assert(poll.choices.length === 2);
        done();
      });
  });
});
