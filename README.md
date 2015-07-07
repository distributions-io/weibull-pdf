Weibull
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Weibull](https://en.wikipedia.org/wiki/Weibull_distribution) distribution probability density function (PDF).

[insert eqn]


## Installation

``` bash
$ npm install distributions-weibull-pdf
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var pdf = require( 'distributions-weibull-pdf' );
```

#### pdf( x[, options] )

Evaluates the probability density function (PDF) for the [Weibull](https://en.wikipedia.org/wiki/Weibull_distribution) distribution. `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript

```


## Examples

``` javascript
var pdf = require( 'distributions-weibull-pdf' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.

[npm-image]: http://img.shields.io/npm/v/distributions-weibull-pdf.svg
[npm-url]: https://npmjs.org/package/distributions-weibull-pdf

[travis-image]: http://img.shields.io/travis/distributions-io/weibull-pdf/master.svg
[travis-url]: https://travis-ci.org/distributions-io/weibull-pdf

[coveralls-image]: https://img.shields.io/coveralls/distributions-io/weibull-pdf/master.svg
[coveralls-url]: https://coveralls.io/r/distributions-io/weibull-pdf?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/weibull-pdf.svg
[dependencies-url]: https://david-dm.org/distributions-io/weibull-pdf

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/weibull-pdf.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/weibull-pdf

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/weibull-pdf.svg
[github-issues-url]: https://github.com/distributions-io/weibull-pdf/issues
