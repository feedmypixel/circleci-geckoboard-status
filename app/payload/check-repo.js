const { repoName } = require('../config')
const { get } = require('lodash')

const checkRepo = (watchedRepo = repoName) => {
  return function (req, res, next) {
    const payloadRepoName = get(req, 'body.payload.reponame')

    if (watchedRepo !== payloadRepoName) {
      return next(Error('CircleCi payload reponame does not match config repoName'))
    }

    return next()
  }
}

module.exports = checkRepo
