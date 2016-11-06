# good-winston-object [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> hapi good-reporter for winston

## Installation

```sh
$ npm install --save good-winston-object
```

## Usage

```js
const winston = require('winston');
const logger = new winston.Logger({
  level: 'info',
  transports: [
    new (winston.transports.Console)({
      colorize: true
    }),
    new (winston.transports.File)({
      filename: './mylogfile.log',
      logstash: true
    })
  ]
});

const reporters = {
  winston: [{
    module: 'good-squeeze',
    name: 'Squeeze',
    args: [{ log: '*', response: '*' }]
  }, {
    module: 'good-winston-object',
    args: [logger]
  }]
};

server.register({
  register: require('good'),
  options: {
    reporters
  },
}, (err) => {

  if (err) {
    return server.log(['error'], err);
  }

  server.start(() => {
    server.log(['info', 'start'], `Server started at ${ server.info.uri }`);
  });
});
```
## License

MIT © [Paolo Chiabrera](https://github.com/paolo-chiabrera)


[npm-image]: https://badge.fury.io/js/good-winston-object.svg
[npm-url]: https://npmjs.org/package/good-winston-object
[travis-image]: https://travis-ci.org/paolo-chiabrera/good-winston-object.svg?branch=master
[travis-url]: https://travis-ci.org/paolo-chiabrera/good-winston-object
[daviddm-image]: https://david-dm.org/paolo-chiabrera/good-winston-object.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/paolo-chiabrera/good-winston-object
[coveralls-image]: https://coveralls.io/repos/paolo-chiabrera/good-winston-object/badge.svg
[coveralls-url]: https://coveralls.io/r/paolo-chiabrera/good-winston-object
