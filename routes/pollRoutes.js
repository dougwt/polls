// const PollController = require('../controllers/poll_controller');

module.exports = (app) => {
  app.get(
    '/api/polls',
    (req, res) => {
      res.json({ msg: 'Received!' });
    }
  );
}
