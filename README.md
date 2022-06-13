#digital-engagement-platform-frontend

## About
This is a front-end service for supplying Digital Assistants(DA) and Webchats to gov.uk users. It provides the following types of DAs:

1) Popup - reactive (click to chat)
2) Popup - proactive (pops up automatically on the page)
3) Embedded - full page - Nuance skin
4) Embedded - full page - HMRC skin

URLs containing `\webchat` are used for popup versions of the DA and URLs containing `\chat` are used for embedded DAs.

This application uses `node 12`. Follow these steps if you don't know how to set your local version of node to `12`:

First of all, we need `nvm` (node version manager, so that we can run `node 12`)

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash
```

With `nvm` installed, we can set our node version to 12

```
nvm install 12
```

```
nvm use 12
```

## Running from source
Clone the repository using SSH:

`git@github.com:hmrc/digital-engagement-platform-frontend.git`

Run the code from source using

`./run_local.sh`

Dependencies will also need to be started from source or using service manager.

To access the various types of DAs you can use the following URLs (examples):

*Reactive popup*
`http://localhost:9956/ask-hmrc/webchat/customs-international-trade?url=https://www.qa.tax.service.gov.uk/ask-hmrc/webchat/customs-international-trade`

*Embedded with Nuance skin*
`http://localhost:9956/ask-hmrc/chat/self-assessment?url=https://www.qa.tax.service.gov.uk/ask-hmrc/chat/self-assessment`

*Embedded with HMRC skin*
`http://localhost:9956/ask-hmrc/chat/ask-hmrc-online?url=https://www.qa.tax.service.gov.uk/ask-hmrc/chat/ask-hmrc-online`

NOTE: to see the DA on a page in your local environment, this service must be ran from source and you will need to add the url query parameter to any URL which states the QA environment equivalent. This is so, locally, you can interact with Nuance's pre-prod environment.

## Running through service manager
The application runs on port 9956

*You need to be on the VPN*

Ensure your service manager config is up to date, and run the following command:

`sm --start DIGITAL_ENGAGEMENT_PLATFORM_ALL -r`

This will start all the required services

## Unit tests

To run the unit tests execute

```
sbt test
```

This application also uses JavaScript code, and there is a set of JavaScript tests to cover the behaviour the system intends. The service uses `gulp.js` to pipeline all the JavaScript tests into the sbt test pipeline. To be able to run JavaScript tests in isolation you will need `gulp.js` and also `jest` (the test runner currently used). 

Let's install `gulp cli` then we can run gulp commands:

```
npm install --global gulp-cli
```

Now, all we have left is to install `jest` globally:

```
npm install --global jest
```

We now can run our JavaScripts tests with:
```
gulp jest
```
or, since you have `jest` globally
```
jest
```

## Custom gulp commands

To wipe all your node modules use the below command, after that - if you do `sbt-test` it will automatically run an `npm-install` (or you can do `npm-install` manually)

```
gulp clean:node_modules
```

Our JavaScript code is bundled at compile time, if you want to check what the bundled code will look like locally, please run:

```
gulp bundle
```

The bundled code will be created within `app/assets/javascripts/bundle/gtm_dl.js`

### License

This code is open source software licensed under the [Apache 2.0 License]("http://www.apache.org/licenses/LICENSE-2.0.html").
