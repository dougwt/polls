const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/polls_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', error => console.warn('Warning:', error));
});

beforeEach((done) => {
  const { polls, users } = mongoose.connection.collections;

  // Promise.all([users.drop(), comments.drop(), blogposts.drop()])
  //   .then(() => done());

  polls.drop(() => {
    users.drop(() => {
      done();
    });
  });

});
