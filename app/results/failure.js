const failure = (req, res) => {
  return res.status(200)
    .send('Not a watched branch')
}

module.exports = failure
