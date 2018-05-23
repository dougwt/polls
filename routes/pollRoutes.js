const PollController = require('../controllers/poll_controller');

module.exports = (app) => {
  app.get(
    '/api/polls',
    PollController.fetch
  );

  app.post(
    '/api/polls/new',
    PollController.create
  );
}
