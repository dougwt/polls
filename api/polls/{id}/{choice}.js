module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).send({ error: 'Unsupported request method' });
  }
};
