const User = require('../models/User');
const Poll = require('../models/Poll');

module.exports = {
  fetchAll(req, res, next) {
    Poll.find({}).then(polls => {
      return res.send(polls);
    });
  },

  vote(req, res, next) {
    const userId = req.user;
    const pollId = req.params.id;
    const choiceId = req.params.choice;

    // Find the poll
    Poll.findById(pollId)
      .then(poll => {
        // Reject if pollId not found in the database
        if (!poll) {
          return res.status(400).send({ error: 'Invalid poll' });
        }

        // Reject if choiceId not found in the poll choices
        let results = poll.choices.filter(choice => choice.id === choiceId);
        if (results.length < 1) {
          return res.status(400).send({ error: 'Invalid choice' });
        }

        // Increment the vote count
        results[0].votes += 1;

        // Update the respondents list
        User.findById(userId).then(user => {
          results = poll.respondents.filter(responder => responder !== userId);
          // Reject if userId has already voted on this poll
          if (results.length > 0) {
            return res
              .status(400)
              .send({ error: 'You have already voted on this poll.' });
          }
          // Add userId to list of poll respondents
          poll.respondents.push(user);
          poll
            .save()
            .then(poll => res.json(poll))
            .catch(err => console.log(err));
        });
      })
      .catch(err => {
        return res.status(400).send({ error: 'Invalid poll' });
      });
  },

  create(req, res, next) {
    const { owner, question, choices } = req.body;

    // Find the user creating the poll
    User.findById(owner)
      .then(user => {
        // Reject if owner not found in the database
        if (!user) {
          return res.status(400).send({ error: 'Invalid user' });
        }

        // Reject if the form data doesn't much same id as auth'ed user id
        if (user.id != req.user.id) {
          return res
            .status(401)
            .send({ error: 'You are unauthorized to make this request.' });
        }

        // Create the new poll
        Poll.create({ owner: user, question, choices })
          .then(poll => res.send(poll))
          .catch(err => {
            return res.status(500).send({ error: 'Error saving poll' });
          });
      })
      .catch(err => {
        return res.status(400).send({ error: 'Invalid user' });
      });
  },

  fetchById(req, res, next) {
    const { id } = req.params;

    // Find the poll
    Poll.findById(id)
      .then(poll => {
        // Reject if id not found in the database
        if (!poll) {
          return res.status(400).send({ error: 'Invalid poll' });
        }
        return res.json(poll);
      })
      .catch(err => {
        return res.status(400).send({ error: 'Invalid poll' });
      });
  },

  updateById(req, res, next) {
    const { id } = req.params;
    const { question, choices } = req.body;

    // Find the poll
    Poll.findById(id)
      .then(poll => {
        // Reject if id not found in the database
        if (!poll) {
          return res.status(400).send({ error: 'Invalid poll' });
        }

        // Reject if owner of poll being updated doesn't mach auth'ed user
        if (poll.owner != req.user.id) {
          return res
            .status(401)
            .send({ error: 'You are unauthorized to make this request.' });
        }

        // Update the poll fields
        if (question) {
          poll.question = question;
        }
        if (choices) {
          poll.choices = choices;
        }
        poll.save().then(poll => res.send(poll));
      })
      .catch(err => {
        return res.status(400).send({ error: 'Invalid poll' });
      });
  },

  deleteById(req, res, next) {
    const { id } = req.params;

    // Find the poll
    Poll.findById(id)
      .then(poll => {
        // Reject if id not found in the database
        if (!poll) {
          return res.status(400).send({ error: 'Invalid poll' });
        }

        // Reject if owner of poll being deleted doesn't mach auth'ed user
        if (poll.owner != req.user.id) {
          return res
            .status(401)
            .send({ error: 'You are unauthorized to make this request.' });
        }

        // Delete the poll
        Poll.findByIdAndRemove(id)
          .then(() => {
            return res.status(204).end();
          })
          .catch(err => {
            return res.status(400).send({ error: 'Unable to delete poll' });
          });
      })
      .catch(err => {
        return res.status(400).send({ error: 'Invalid poll' });
      });
  }
};
