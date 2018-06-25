const express = require('express');

module.exports = app => {
  require('./authRoutes')(app);
  require('./pollRoutes')(app);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  app.get('*', (req, res) => {
    return res.status(404).send({ error: 'Resource not found' });
  });
};
