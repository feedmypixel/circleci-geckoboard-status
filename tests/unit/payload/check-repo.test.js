const { set } = require('lodash')

const checkRepo = require('../../../app/payload/check-repo')

describe('#checkRepo', () => {
  beforeEach(() => {
    this.nextMock = jest.fn()
    this.requestMock = {}
    this.responseMock = {}
    this.mockRepoName = 'mock-repo-name'
    this.otherMockRepoName = 'other-mock-repo-name'
  })

  test('next should be called with matching repo name', async () => {
    set(this.requestMock, 'body.reponame', this.mockRepoName)
    await checkRepo(this.mockRepoName)(this.requestMock, this.responseMock, this.nextMock)

    expect(this.nextMock).toHaveBeenCalled()
  })

  test('next should be called without arguments when repo name matches', async () => {
    set(this.requestMock, 'body.payload.reponame', this.mockRepoName)
    await checkRepo(this.mockRepoName)(this.requestMock, this.responseMock, this.nextMock)

    expect(this.nextMock).toHaveBeenCalledWith()
  })

  test('next should be called with error when repo does not matche', async () => {
    set(this.requestMock, 'body.payload.reponame', this.mockRepoName)
    await checkRepo(this.otherMockRepoName)(this.requestMock, this.responseMock, this.nextMock)

    expect(this.nextMock).toHaveBeenCalledWith(Error('CircleCi payload reponame does not match config repoName'))
  })
})
