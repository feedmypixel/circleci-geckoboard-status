const { get, assign, pick } = require('lodash')

const parsePayload = require('../../../app/payload/parse')
const failureMockPayload = require('../data/mock-payload-failed')
const mockPayload = require('../data/mock-payload')
const dataSetItems = [
  'failed',
  'author_name',
  'branch'
]

describe('#parsePayload', () => {
  beforeEach(() => {
    this.nextMock = jest.fn()
    this.responseMock = {}
  })

  describe('matching branch', () => {
    test('middleware should call next with matching branch', () => {
      this.branch = get(mockPayload, 'payload.branch')

      parsePayload(this.branch)({ body: mockPayload }, this.responseMock, this.nextMock)

      expect(this.nextMock.mock.calls.length).toBe(1)
    })

    test('middleware should parse payload when branch matches', () => {
      this.expectedData = assign({}, pick(get(mockPayload, 'payload'), dataSetItems))
      this.branch = get(mockPayload, 'payload.branch')

      parsePayload(this.branch)({ body: mockPayload }, this.responseMock, this.nextMock)

      expect(this.responseMock).toEqual({
        locals: {
          data: this.expectedData
        }
      })
    })

    test('middleware should call next with matching branch for failed job', () => {
      this.branch = get(failureMockPayload, 'payload.branch')

      parsePayload(this.branch)({ body: failureMockPayload }, this.responseMock, this.nextMock)

      expect(this.nextMock.mock.calls.length).toBe(1)
    })

    test('middleware should parse payload for matching failed job', () => {
      this.branch = get(failureMockPayload, 'payload.branch')
      this.expectedData = assign({}, pick(get(failureMockPayload, 'payload'), dataSetItems))

      parsePayload(this.branch)({ body: failureMockPayload }, this.responseMock, this.nextMock)

      expect(this.responseMock).toEqual({
        locals: {
          data: this.expectedData
        }
      })
    })
  })

  describe('non matching branch', () => {
    beforeEach(() => {
      this.nonMatchingBranch = 'branch-other'
    })

    test('middleware should call next when branch does not match', () => {
      parsePayload(this.nonMatchingBranch)({ body: mockPayload }, this.responseMock, this.nextMock)

      expect(this.nextMock.mock.calls.length).toBe(1)
    })

    test('middleware should call not parse payload when branch does not match', () => {
      parsePayload(this.nonMatchingBranch)({ body: mockPayload }, this.responseMock, this.nextMock)

      expect(this.responseMock).toEqual({})
    })
  })
})
