const Poll = require('../../../models/Poll');

function fetchById(req, res) {
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
}

function updateById(req, res) {
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
}

function deleteById(req, res, next) {
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

module.exports = (req, res) => {
  switch (req.method) {
    case 'POST':
      return updateById(req, res);
    case 'DELETE':
      return deleteById(req, res);
    case 'GET':
      return fetchById(req, res);
    default:
      return res.status(404).send({ error: 'Unsupported request method' });
  }
};
