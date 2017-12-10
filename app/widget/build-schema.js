const { get } = require('lodash')

const buildWidgetData = (data) => {
  if (!data) { return {} }

  const widgetStateClassName = `circle-ci-widget--${data.failed ? 'failed' : 'success'}`
  const branch = get(data, 'branch')
  const author = get(data, 'author_name')

  return {
    item: [
      {
        text: `<div class="circle-ci-widget ${widgetStateClassName}">
                 <div class="circle-ci-widget__upper-content">
                   <h1 class="circle-ci-widget__branch-name">${branch}</h1>
                 </div>
                 <div class="circle-ci-widget__label">Merged by</div>
                 <div class="circle-ci-widget__info">${author}</div>
               </div>`
      }
    ]
  }
}

module.exports = buildWidgetData
