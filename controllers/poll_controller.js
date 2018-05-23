const User = require('../models/User');
const Poll = require('../models/Poll');

module.exports = {
  fetch(req, res, next) {
    Poll.find({})
      .then((polls) => {
          res.json(polls);
      })
  },

  create(req, res, next) {
    let { owner, question, choices } = req.body;

    User.findById(owner)
      .then(user => {
        // console.log(user);
        // console.log(req.body);
        Poll.create({ owner: user, question, choices })
          .then(poll => res.send(poll))
          .catch(err => {
            res.status(500).send({ error: 'Error saving poll' });
          })
      })
      .catch(err => {
        res.status(400).send({ error: 'Invalid user' });
      });


  }
};
