const { set } = require('lodash')
const nock = require('nock')

const postData = require('../../../app/widget/post-data')

describe('#postData', () => {
  beforeEach(() => {
    this.nextMock = jest.fn()
    this.requestMock = {}
    this.responseMock = {}
    this.mockApiKey = '1234-5678-abcd'
    this.mockApiDetail = {
      host: 'http://mock-api',
      path: '/mock-path'
    }
    this.mockApiUrl = this.mockApiDetail.host + this.mockApiDetail.path
    this.mockParsedPayload = {
      failed: false,
      committer_name: 'Jason Example',
      branch: 'mock-branch'
    }
  })

  describe('successful api POST call', () => {
    beforeEach(() => {
      this.nockScope = nock(this.mockApiDetail.host)
        .post(this.mockApiDetail.path)
        .reply(200)

      set(this.responseMock, 'locals.data', this.mockParsedPayload)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    test('next should be called', async () => {
      await postData(this.mockApiKey, this.mockApiUrl)(this.requestMock, this.responseMock, this.nextMock)

      expect(this.nextMock).toHaveBeenCalled()
    })

    test('next should be called without arguments', async () => {
      await postData(this.mockApiKey, this.mockApiUrl)(this.requestMock, this.responseMock, this.nextMock)

      expect(this.nextMock).toBeCalledWith()
    })

    test('nock mock to of been used', async () => {
      await postData(this.mockApiKey, this.mockApiUrl)(this.requestMock, this.responseMock, this.nextMock)

      expect(this.nockScope.isDone()).toEqual(true)
    })
  })

  describe('api POST call that errors', () => {
    this.mockErrorResponse = { message: 'bad things!', code: '403' }

    beforeEach(() => {
      this.nockScope = nock(this.mockApiDetail.host)
        .post(this.mockApiDetail.path)
        .replyWithError(this.mockErrorResponse)
      set(this.responseMock, 'locals.data', this.mockParsedPayload)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    test('next should be called', async () => {
      await postData(this.mockApiKey, this.mockApiUrl)(this.requestMock, this.responseMock, this.nextMock)

      expect(this.nextMock).toHaveBeenCalled()
    })

    test('next should be called with arguments', async () => {
      await postData(this.mockApiKey, this.mockApiUrl)(this.requestMock, this.responseMock, this.nextMock)

      expect(this.nextMock).toBeCalledWith(this.mockErrorResponse)
    })

    test('nock mock to of been used', async () => {
      await postData(this.mockApiKey, this.mockApiUrl)(this.requestMock, this.responseMock, this.nextMock)

      expect(this.nockScope.isDone()).toEqual(true)
    })
  })

  describe('no api call', () => {
    beforeEach(() => {
      this.nockScope = nock(this.mockApiDetail.host)
        .post(this.mockApiDetail.path)
        .reply(200)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    test('next should be called', async () => {
      await postData()(this.requestMock, this.responseMock, this.nextMock)

      expect(this.nextMock).toHaveBeenCalled()
    })

    test('next should be called without arguments', async () => {
      await postData()(this.requestMock, this.responseMock, this.nextMock)

      expect(this.nextMock).toBeCalledWith()
    })

    test('nock mock to not of been used', async () => {
      await postData()(this.requestMock, this.responseMock, this.nextMock)

      expect(this.nockScope.isDone()).toEqual(false)
    })
  })
})
