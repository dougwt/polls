const PollController = require('../controllers/poll_controller');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.get(
    '/api/polls',
    requireLogin,
    PollController.fetchAll
  );

  app.post(
    '/api/polls/new',
    requireLogin,
    PollController.create
  );

  app.get(
    '/api/polls/:id',
    requireLogin,
    PollController.fetchById
  );

  app.post(
    '/api/polls/:id',
    requireLogin,
    PollController.updateById
  );

  app.delete(
    '/api/polls/:id',
    requireLogin,
    PollController.deleteById
  );
}
