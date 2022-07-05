# printkitty.js sms service

<img src="img/headerimg.jpg" alt="header image" width="300"/>

## What is this?

This is a small service that you can run, either locally (if you've got a static IP/DDNS setup) or in the cloud to act as a SMS gateway for [printkitty.js](https://github.com/mickwheelz/printkitty.js).

**TLDR;** your cat printer can now receive and print SMSs

## How does it work?

It uses [twilio](https://www.twilio.com/) as a SMS gateway, [mongoDB](https://www.mongodb.com/) for storing the SMS and exposes a REST API that printkitty polls to handle the actual printing part.

TODO: Diagram

## How do I use it?

TODO 🤷🏼‍♀️

### Environment Variables

The following enviornemnt variables need to be set in order to use the service. This can either be done in the usual fashion (`export ...`), via your cloud provider or using [dotenv](https://www.npmjs.com/package/dotenv)

| Variable    | Description | Example |
|-------------|-------------|---------|
|MONGO_DB_URL |The full connection url to your mongoDB instance |"mongodb://localhost/printkittySMS"|
|AUTH_USERNAME|The username to use for the REST API |"admin"|
|AUTH_PASSWORD|The password to use for the REST API |"secret"|
|SERVER_PORT  |The port for the REST API to run on |3000|

### API Reference

The service exposes the following endpoints.

|Endpoint|Method|Description|Example|
|--------|------|-----------|-------|
|`/health`|`GET`|Health check for k8s, etc| `GET /health` |
|`/getSMS/:status`|`GET`|Gets all SMS for a given status| `GET /getSMS/PENDING` |
|`/handleInboundSMS`|`POST`|Accepts incoming SMS from twilio| `POST /handleInboundSMS?From=%2B447000111000&Body=text&...` |
|`/updateSMSStatus/:id`|`POST`|Updates a single SMS with the given payload| `POST /updateSMSStatus/62c3308c478f3811b45db688 ` <br /> `Body: {"status":"ERROR"}` |
|`/updateSMSStatus`|`POST`|Updates multiple SMSs with the given payload| TODO |

### Twilio Setup

TODO
