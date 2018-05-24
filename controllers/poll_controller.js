const User = require('../models/User');
const Poll = require('../models/Poll');

module.exports = {
  fetchAll(req, res, next) {
    Poll.find({})
      .then((polls) => {
          return res.send(polls);
      })
  },

  // vote(req, res, next) {
  //   const { poll, choice } = req.body;
  // },

  create(req, res, next) {
    const { owner, question, choices } = req.body;

    User.findById(owner)
      .then(user => {
        if (!user) {
          return res.status(400).send({ error: 'Invalid user' });
        }
        if (user.id != req.user.id) {
          return res.status(401).send({ error: 'You are unauthorized to make this request.' });
        }

        Poll.create({ owner: user, question, choices })
          .then(poll => res.send(poll))
          .catch(err => {
            return res.status(500).send({ error: 'Error saving poll' });
          })
      })
      .catch(err => {
        return res.status(400).send({ error: 'Invalid user' });
      });
  },

  fetchById(req, res, next) {
    const { id } = req.params;

    Poll.findById(id)
      .then(poll => {
        if (!poll) {
          return res.status(400).send({ error: 'Invalid poll' });
        }
        return res.json(poll)
      })
      .catch(err => {
        return res.status(400).send({ error: 'Invalid poll' });
      });
  },

  updateById(req, res, next) {
    const { id } = req.params;
    const { question, choices } = req.body;

    Poll.findById(id)
      .then(poll => {
        if (!poll) {
          return res.status(400).send({ error: 'Invalid poll' });
        }
        if (poll.owner != req.user.id) {
          return res.status(401).send({ error: 'You are unauthorized to make this request.' });
        }
        if (question) {
          poll.question = question;
        }
        if (choices) {
          poll.choices = choices;
        }
        poll.save()
          .then(poll => res.send(poll))
      })
      .catch(err => {
        return res.status(400).send({ error: 'Invalid poll' });
      });
  },

  deleteById(req, res, next) {
    const { id } = req.params;

    Poll.findById(id)
      .then(poll => {
        if (!poll) {
          return res.status(400).send({ error: 'Invalid poll' });
        }
        if (poll.owner != req.user.id) {
          return res.status(401).send({ error: 'You are unauthorized to make this request.' });
        }
        Poll.findByIdAndRemove(id)
          .then(() => {
            return res.status(204).end();
          })
          .catch(err => {
            return res.status(400).send({ error: 'Unable to delete poll' });
          })

      })
      .catch(err => {
        return res.status(400).send({ error: 'Invalid poll' });
      })
  }
};
