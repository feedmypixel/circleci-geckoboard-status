const { branch } = require('../config')
const { get, set, pick } = require('lodash')

const parsePayload = (watchedBranch = branch) => {
  return function (req, res, next) {
    const payload = get(req, 'body.payload')
    const payloadBranch = get(payload, 'branch')

    if (payloadBranch === watchedBranch) {
      set(res, 'locals.data', pick(payload, [
        'failed',
        'author_name',
        'branch'
      ]))
    }
    next()
  }
}

module.exports = parsePayload
