const buildWidgetSchema = require('../../../app/widget/build-schema')

describe('#buildWidgetText', () => {
  beforeEach(() => {
    this.nextMock = jest.fn()
    this.responseMock = {}
  })

  test('should return empty object if no data argument passed', () => {
    const widgetData = buildWidgetSchema()

    expect(widgetData).toMatchObject({})
  })

  describe('expected widget data object', () => {
    beforeEach(() => {
      this.branch = 'mock-branch-name'
      this.authorName = 'Jason Example'
      this.widgetData = buildWidgetSchema({
        failed: true,
        author_name: this.authorName,
        branch: this.branch
      })
    })

    test('should contain branch information', () => {
      expect(this.widgetData.item[0].text).toEqual(
        expect.stringContaining(this.branch)
      )
    })

    test('should contain author name', () => {
      expect(this.widgetData.item[0].text).toEqual(
        expect.stringContaining(this.authorName)
      )
    })

    test('should contain failed className', () => {
      expect(this.widgetData.item[0].text).toEqual(
        expect.stringContaining('circle-ci-widget--failed')
      )
    })

    test('should contain merger label', () => {
      expect(this.widgetData.item[0].text).toEqual(
        expect.stringContaining('Merged by')
      )
    })

    test('should be formed of the expected structure', () => {
      expect(this.widgetData).toEqual(
        expect.objectContaining({
          item: expect.arrayContaining([
            expect.objectContaining({
              text: expect.stringContaining('circle-ci-widget')
            })
          ])
        })
      )
    })
  })
})
