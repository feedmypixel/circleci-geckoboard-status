const config = {
  port: process.env.PORT || 3048,
  geckoBoard: {
    apiKey: process.env.GECKO_BOARD_API_KEY,
    widgetUrl: process.env.GECKO_BOARD_WIDGET_URL
  },
  repoName: process.env.REPO_NAME,
  branch: process.env.BRANCH
}

module.exports = config
