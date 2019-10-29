const User = require('../../models/User');
const Poll = require('../../models/Poll');

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).send({ error: 'Unsupported request method' });
  }

  const { owner, question, choices } = req.body;

  // Find the user creating the poll
  User.findById(owner)
    .then(user => {
      // Reject if owner not found in the database
      if (!user) {
        return res.status(400).send({ error: 'Invalid user' });
      }

      // Reject if the form data doesn't much same id as auth'ed user id
      if (user.id !== req.user.id) {
        return res
          .status(401)
          .send({ error: 'You are unauthorized to make this request.' });
      }

      // Create the new poll
      return Poll.create({ owner: user, question, choices })
        .then(poll => res.send(poll))
        .catch(() => {
          return res.status(500).send({ error: 'Error saving poll' });
        });
    })
    .catch(() => {
      return res.status(400).send({ error: 'Invalid user' });
    });
};
