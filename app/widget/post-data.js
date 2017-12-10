const { get, set } = require('lodash')
const request = require('request-promise')

const { geckoBoard: { apiKey, widgetUrl } } = require('../config')
const buildWidgetSchema = require('./build-schema')

const postData = (key = apiKey, uri = widgetUrl) => {
  return async function (req, res, next) {
    const parsedPayload = get(res, 'locals.data')

    if (parsedPayload) {
      const data = buildWidgetSchema(parsedPayload)

      try {
        await request({
          json: true,
          method: 'POST',
          uri,
          body: {
            api_key: key,
            data
          }
        }).then((result) => {
          set(res, 'locals.result', result)
        })
      } catch (response) {
        return next(response.error)
      }
    }

    return next()
  }
}

module.exports = postData
