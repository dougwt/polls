const PollController = require('../controllers/poll_controller');

module.exports = (app) => {
  app.get(
    '/api/polls',
    PollController.fetchAll
  );

  app.post(
    '/api/polls/new',
    PollController.create
  );

  app.get(
    '/api/polls/:id',
    PollController.fetchById
  );

  app.post(
    '/api/polls/:id',
    PollController.updateById
  );

  app.delete(
    '/api/polls/:id',
    PollController.deleteById
  );
}
