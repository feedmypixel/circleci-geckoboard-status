const express = require('express')
const morgan = require('morgan')

const { port } = require('./config')

const checkRepo = require('./payload/check-repo')
const parsePayload = require('./payload/parse')
const postData = require('./widget/post-data')
const redirectToResult = require('./results/redirect-to')
const successResult = require('./results/success')
const failureResult = require('./results/failure')
const catchAllErrors = require('./errors/catch-all')

const app = express()
app.use(express.json({ limit: '500kb' }))
app.use(morgan('dev'))

app.post('/parse-payload', checkRepo(), parsePayload(), postData(), redirectToResult())
app.get('/success', successResult)
app.get('/failure', failureResult)

app.use(catchAllErrors())

app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

module.exports = app
