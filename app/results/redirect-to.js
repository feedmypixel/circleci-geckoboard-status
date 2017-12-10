const { get } = require('lodash')

const redirectToResult = () => {
  return function (req, res) {
    const success = get(res, 'locals.result.success', false)

    if (success) {
      return res.redirect('/success')
    } else {
      return res.redirect('/failure')
    }
  }
}

module.exports = redirectToResult
