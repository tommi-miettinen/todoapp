![](https://www.geniem.fi/app/themes/geniem/assets/images/geniem_logo.svg)

TypeScripted boilerplate REST backend with a layered architecture.

## Authors
- Topi Latva-Salo (topi.latva-salo@geniem.com)
- Timo Laakso (timo.laakso@geniem.com)

## Running and development

1. Clone the repository
1. Run `npm install`
1. Run `docker-compose up` to start up the needed services (development database etc.)
1. Run `npm start`

The app is automatically started in watch mode, i.e. it recompiles whenever there's a change to a source file.

## Design principles

- The 5 [SOLID](https://en.wikipedia.org/wiki/SOLID) principles.
- Dependency injection with [`InversifyJS`](https://github.com/inversify/InversifyJS)
- [Layered architecture](https://docs.microsoft.com/en-us/previous-versions/msp-n-p/ee658117(v=pandp.10)#LayeredStyle)
  - HTTP-layer with [`routing-controllers`](https://github.com/typestack/routing-controllers)
  - Separate service layer for business logic
  - Separate repository layer with [`knex`](http://knexjs.org/) + [`Objection`](https://vincit.github.io/objection.js/)
- Separate services for integration 
  - Larger system integrations with [Gateway pattern](https://martinfowler.com/eaaCatalog/gateway.html)