Probability Density Function
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> [Weibull](https://en.wikipedia.org/wiki/Weibull_distribution) distribution probability density function (PDF).

The [probability density function](https://en.wikipedia.org/wiki/Probability_density_function) (PDF) for a [Weibull](https://en.wikipedia.org/wiki/Weibull_distribution) random variable is

<div class="equation" align="center" data-raw-text="
    f(x;\lambda,k) = \begin{cases} \frac{k}{\lambda}\left (\frac{x}{\lambda} \right)^{k-1}e^{-(x/\lambda)^k} &amp; x \geq 0 \\ 0 &amp; x < 0\end{cases}" data-equation="eq:error_function">
	<img src="https://cdn.rawgit.com/distributions-io/weibull-pdf/142ab451150bdb73ccf5f258ddf3dcb6c59153e9/docs/img/eqn.svg" alt="Probability density function (PDF) for a Weibull distribution.">
	<br>
</div>

where `lambda` and `k` are the respective [scale](https://en.wikipedia.org/wiki/Scale_parameter) and [shape](https://en.wikipedia.org/wiki/Shape_parameter) parameters of the distribution.


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

Evaluates the [probability density function](https://en.wikipedia.org/wiki/Probability_density_function) (PDF) for the [Weibull](https://en.wikipedia.org/wiki/Weibull_distribution) distribution. `x` may be either a [`number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or a [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	mat,
	out,
	x,
	i;

out = pdf( 1 );
// returns ~0.6065

out = pdf( -1 );
// returns 0

x = [ 0, 0.5, 1, 1.5, 2, 2.5 ];
out = pdf( x );
// returns [ 1, ~0.6065, ~0.3679, ~0.2231, ~0.1353, ~0.0821 ]

x = new Int8Array( x );
out = pdf( x );
// returns Float64Array( [ 1, 1, ~0.3679, ~0.3679, ~0.1353, ~0.1353 ] )

x = new Int16Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i * 0.5;
}
mat = matrix( x, [3,2], 'int16' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = pdf( mat );
/*
	[       1  ~0.6065
	  ~0.3679  ~0.2231
	  ~0.1353  ~0.0821 ]
*/
```

The function accepts the following `options`:

*	__lambda__: [scale](https://en.wikipedia.org/wiki/Scale_parameter) parameter. Default: `1`.
*	__k__: [shape](https://en.wikipedia.org/wiki/Shape_parameter) parameter. Default: `1`.
* 	__accessor__: accessor `function` for accessing `array` values.
* 	__dtype__: output [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.
*	__copy__: `boolean` indicating if the `function` should return a new data structure. Default: `true`.
*	__path__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path.
*	__sep__: [deepget](https://github.com/kgryte/utils-deep-get)/[deepset](https://github.com/kgryte/utils-deep-set) key path separator. Default: `'.'`.

A [Weibull](https://en.wikipedia.org/wiki/Weibull_distribution) distribution is a function of two parameters: `lambda` ([scale](https://en.wikipedia.org/wiki/Scale_parameter) parameter) and `k` ([shape](https://en.wikipedia.org/wiki/Shape_parameter) parameter). By default, both parameters are equal to `1`. To adjust either parameter, set the corresponding option(s).

``` javascript
var x = [ 0, 0.5, 1, 1.5, 2, 2.5 ];

var out = pdf( x, {
	'lambda': 2,
	'k': 5	
});
// returns [ 0, ~0.0098, ~0.1514, ~0.6239, ~0.9197, ~0.2885 ]
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	[0,0],
	[1,0.5],
	[2,1],
	[3,1.5],
	[4,2],
	[5,2.5]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var out = pdf( data, {
	'accessor': getValue
});
// returns [ 1, ~0.6065, ~0.3679, ~0.2231, ~0.1353, ~0.0821 ]
```


To [deepset](https://github.com/kgryte/utils-deep-set) an object `array`, provide a key path and, optionally, a key path separator.

``` javascript
var data = [
	{'x':[0,0]},
	{'x':[1,0.5]},
	{'x':[2,1]},
	{'x':[3,1.5]},
	{'x':[4,2]},
	{'x':[5,2.5]}
];

var out = pdf( data, 'x|1', '|' );
/*
	[
		{'x':[0,1]},
		{'x':[1,~0.6065]},
		{'x':[2,~0.3679]},
		{'x':[3,~0.2231]},
		{'x':[4,~0.1353]},
		{'x':[5,~0.0821]}
	]
*/

var bool = ( data === out );
// returns true
```

By default, when provided a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), the output data structure is `float64` in order to preserve precision. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
var x, out;

x = new Int8Array( [0,1,2,3,4] );

out = pdf( x, {
	'dtype': 'int32'
});
// returns Int32Array( [1,0,0,0,0] )

// Works for plain arrays, as well...
out = pdf( [0,0.5,1,1.5,2], {
	'dtype': 'uint8'
});
// returns Uint8Array( [1,0,0,0,0] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var bool,
	mat,
	out,
	x,
	i;

x = [ 0, 0.5, 1, 1.5, 2 ];

out = pdf( x, {
	'copy': false
});
// returns [ 1, ~0.6065, ~0.3679, ~0.2231, ~0.1353 ]

bool = ( x === out );
// returns true

x = new Int16Array( 6 );
for ( i = 0; i < 6; i++ ) {
	x[ i ] = i * 0.5;
}
mat = matrix( x, [3,2], 'int16' );
/*
	[ 0  0.5
	  1  1.5
	  2  2.5 ]
*/

out = pdf( mat, {
	'copy': false
});
/*
	[       1  ~0.6065
	  ~0.3679  ~0.2231
	  ~0.1353  ~0.0821 ]
*/

bool = ( mat === out );
// returns true
```


## Notes

*	If an element is __not__ a numeric value, the evaluated [PDF](https://en.wikipedia.org/wiki/Weibull_distribution) is `NaN`.

	``` javascript
	var data, out;

	out = pdf( null );
	// returns NaN

	out = pdf( true );
	// returns NaN

	out = pdf( {'a':'b'} );
	// returns NaN

	out = pdf( [ true, null, [] ] );
	// returns [ NaN, NaN, NaN ]

	function getValue( d, i ) {
		return d.x;
	}
	data = [
		{'x':true},
		{'x':[]},
		{'x':{}},
		{'x':null}
	];

	out = pdf( data, {
		'accessor': getValue
	});
	// returns [ NaN, NaN, NaN, NaN ]

	out = pdf( data, {
		'path': 'x'
	});
	/*
		[
			{'x':NaN},
			{'x':NaN},
			{'x':NaN,
			{'x':NaN}
		]
	*/
	```

*	Be careful when providing a data structure which contains non-numeric elements and specifying an `integer` output data type, as `NaN` values are cast to `0`.

	``` javascript
	var out = pdf( [ true, null, [] ], {
		'dtype': 'int8'
	});
	// returns Int8Array( [0,0,0] );
	```


## Examples

``` javascript
var pdf = require( 'distributions-weibull-pdf' ),
	matrix = require( 'dstructs-matrix' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i * 0.5;
}
out = pdf( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = pdf( data, {
	'accessor': getValue
});

// Deep set arrays...
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': [ i, data[ i ].x ]
	};
}
out = pdf( data, {
	'path': 'x/1',
	'sep': '/'
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
out = pdf( data );

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = pdf( mat );

// Matrices (custom output data type)...
out = pdf( mat, {
	'dtype': 'uint8'
});
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
$ make view-cov
```

### Notes

This implementation was tested against its [`R`](http://stat.ethz.ch/R-manual/R-patched/library/stats/html/Weibull.html) counterpart. To generate the [`R`](http://stat.ethz.ch/R-manual/R-patched/library/stats/html/Weibull.html) results,

``` bash
$ Rscript ./test/runner.R
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
