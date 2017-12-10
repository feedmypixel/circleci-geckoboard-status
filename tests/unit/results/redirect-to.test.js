const { set } = require('lodash')

const redirectToResult = require('../../../app/results/redirect-to')

describe('#redirectToResult', () => {
  beforeEach(() => {
    this.nextMock = jest.fn()
    this.requestMock = {}
    this.responseMock = {
      redirect: jest.fn()
    }
  })

  describe('success message', () => {
    beforeEach(() => {
      this.mockBranchName = 'mock-branch-name'

      set(this.responseMock, 'locals.result.success', true)
      redirectToResult()(this.requestMock, this.responseMock, this.nextMock)
    })

    test('result redirect method should have been called', () => {
      expect(this.responseMock.redirect).toHaveBeenCalled()
    })

    test('should redirect to success page', () => {
      expect(this.responseMock.redirect).toHaveBeenCalledWith('/success')
    })
  })

  describe('failure message', () => {
    beforeEach(() => {
      set(this.responseMock, 'locals.result.success', false)
      redirectToResult()(this.requestMock, this.responseMock, this.nextMock)
    })

    test('result redirect method should have been called', () => {
      expect(this.responseMock.redirect).toHaveBeenCalled()
    })

    test('should redirect to success page', () => {
      expect(this.responseMock.redirect).toHaveBeenCalledWith('/failure')
    })
  })
})
