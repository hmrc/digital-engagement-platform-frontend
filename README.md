digital-engagement-platform-frontend
=============

This is a front-end service for supplying webchat to gov.uk users.

## Using Service Manager

You can use service manager to provide assets to the frontend. The DEP_ALL service is responsible for starting up all services required by the digital engagement platform frontend project.
This can be started by running:

```
sm --start DIGITAL_ENGAGEMENT_PLATFORM_ALL -f
```

## Run the application

To run the application execute

```
sbt run
```

and then access the application at

```
http://localhost:9956/ask-hmrc/webchat/self-assessment
```

## Unit tests

To run the unit tests execute

```
sbt test
```

### License

This code is open source software licensed under the [Apache 2.0 License]("http://www.apache.org/licenses/LICENSE-2.0.html").
