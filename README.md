# CircleCi geckoboard text widget

[![Build Status](https://travis-ci.org/feedmypixel/circleci-geckoboard-status.svg?branch=master)](https://travis-ci.org/feedmypixel/circleci-geckoboard-status)

An app that transforms payload data from CircleCi and then pushes information to a geckoboard text widget. The 
geckoboard text widget displays the status of the CircleCi job for the specified repository and branch. 
It also shows the last person who committed to this branch.

## Table of contents
- [Screen shots](#screen-shots)
  - [Passed](#passed)
  - [Failure](#failure)
- [Environment variables](#environment-variables)
- [Development](#development)
  - [Setup](#setup)
  - [Running](#running)
  - [CSS styles](#css-styles)
  - [Tests](#tests)
  - [Linting](#linting)
- [Hosting](#hosting)
- [CircleCi webhook](#circleci-webhook)

## Screen shots
### Passed
An example of a successful CircleCi job on `develop` branch

![CircleCi geckoboard text widget example](/screenshot/circleci-geckoboard-text-widget.png?raw=true "Text widget success example")

### Failure
An example of a failed CircleCi job on `master` branch

![CircleCi geckoboard text widget failure example](/screenshot/circleci-geckoboard-text-widget-failure.png?raw=true "Text widget failure example")

## Environment variables
| Name | Description |
|:-----|:------------|
| GECKO_BOARD_API_KEY | geckoboard API key |
| GECKO_BOARD_WIDGET_URL | geckoboard text widget url |
| REPO_NAME | The repository name of your CircleCi job |
| BRANCH | The branch name you wish to show results for |
| PORT | The applications port, defaults to `3048` |

## Development
### Setup
Recommended setup
- [Node.js](https://nodejs.org/en/) >= 8.5.0
- [npm](https://www.npmjs.com/) >= 5.6.0 

To install multiple versions of Node.js, you may find it easier to use a node version manager
- [nvm](https://github.com/creationix/nvm)
- [n](https://github.com/tj/n)

To install dependencies
```
$ npm i
```

## Running
To start the application
```
$ npm start
```

### CSS styles
You will find an example `styles.sass` file in `/widget-example`. Here you can write custom styles for your CircleCi
geckoboard widget.

To create the `styles.css` file run:
```
$ npm run sass
```
You can then upload the `styles.css` file to your geckboard dashboard via `settings > Customize apperance`.

### Tests
To run tests
```
$ npm test
```

### Linting
To run linting
```
$ npm run lint
```

## Hosting
Upload this application to your favourite hosting platform.

## CircleCi webhook
Setup a webhook on you CircleCi Job that sends its payload to this application. Add the following (with your 
applications url) to the bottom of your repositories `config.yaml`

```
notify:
  webhooks:
    - url: <application-url>
```
