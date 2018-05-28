module.exports = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .send({ error: 'You are unauthorized to make this request.' });
  }

  next();
};
