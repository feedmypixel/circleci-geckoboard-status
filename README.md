# CircleCi geckoboard text widget

[![Build Status](https://travis-ci.org/feedmypixel/circleci-geckoboard-status.svg?branch=master)](https://travis-ci.org/feedmypixel/circleci-geckoboard-status)

An app to transform payload data from CircleCi and then push the relevant information to a geckoboard 
text widget. The geckoboard text widget displays the status of the CircleCi job for the specified repository and branch. 
It also shows the last person who committed to this repository and branch.

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
An example of a success on the `develop` branch

![CircleCi geckoboard text widget example](/screenshot/circleci-geckoboard-text-widget.png?raw=true "Text widget success example")

### Failure
An example of a failure on the `master` branch

![CircleCi geckoboard text widget failure example](/screenshot/circleci-geckoboard-text-widget-failure.png?raw=true "Text widget failure example")

## Environment variables
| Name | Description |
|:-----|:------------|
| GECKO_BOARD_API_KEY | Your geckoboard API key |
| GECKO_BOARD_WIDGET_URL | Your geckoboard text widget url |
| REPO_NAME | The repository name that you wish to report the status of CircleCi on |
| BRANCH | The branch name you wish to show CircleCi job status results for |
| PORT | The applications port, defaults to `3048` |

## Development
### Setup
Recommended setup is:
- [Node.js](https://nodejs.org/en/) >= 8.5.0
- [npm](https://www.npmjs.com/) >= 5.6.0 

To install multiple versions of Node.js, you may find it easier to use a node version manager:
- [nvm](https://github.com/creationix/nvm)
- [n](https://github.com/tj/n)

To install all required dependencies run:
```
$ npm i
```

## Running
The application can be started by running:
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
You can then upload the `styles.css` file to your Geckboard dashboard via `settings > Customize apperance`.

### Tests
The applications test can be ran via:
```
$ npm test
```

### Linting
The applications linting can be ran via:
```
$ npm run lint
```

## Hosting
Please upload this application to your favourite hosting platform.

## CircleCi webhook
Setup a webhook on you CircleCi Job that sends its payload to this application. Please add the following (with your 
applications url) to the bottom of your repositories `config.yaml`

```
notify:
  webhooks:
    - url: <application-url>
```
