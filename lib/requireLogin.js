function requireLogin(req, res) {
  if (!req.user) {
    res
      .status(401)
      .send({ error: 'You are unauthorized to make this request.' });
  }
}

module.exports = requireLogin;
