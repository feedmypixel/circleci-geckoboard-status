const { branch } = require('../config')

const successResult = (req, res) => {
  return res.status(200)
    .send(`Data for ${branch} pushed`)
}

module.exports = successResult
