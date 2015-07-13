/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Validate a value is NaN:
	isnan = require( 'validate.io-nan' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	pdf = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'distributions-weibull-pdf', function tests() {

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				pdf( [1,2,3], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a typed-array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( new Int8Array([1,2,3]), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided a matrix and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				pdf( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should return NaN if the first argument is neither a number, array-like, or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			assert.isTrue( isnan( pdf( values[ i ] ) ) );
		}
	});

	it( 'should evaluate the probability density function when provided a number', function test() {
		assert.strictEqual( pdf( 0 ), 1 );
		assert.closeTo( pdf( 2.25 ), 0.1053992245618643, 1e-15 );

		assert.isTrue( isnan( pdf( NaN ) ) );
	});

	it( 'should evaluate the probability density function when provided a plain array', function test() {
		var data, actual, expected;

		data = [ 0, 0.5, 1, 1.5, 2 ];
		expected = [
			1,
			0.6065306597126334,
			0.3678794411714423,
			0.2231301601484298,
			0.1353352832366127
		];

		actual = pdf( data );
		assert.notEqual( actual, data );
		assert.isTrue( deepCloseTo( actual, expected, 1e-15 ) );

		// Mutate...
		actual = pdf( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.isTrue( deepCloseTo( data, expected, 1e-15 ) );
	});

	it( 'should evaluate the probability density function when provided a typed array', function test() {
		var data, actual, expected;

		data = new Int8Array( [ 0, 1, 2, 3, 4 ] );
		expected = new Float64Array( [
			1,
			0.3678794411714423,
			0.1353352832366127,
			0.04978706836786394,
			0.01831563888873418
		]);

		actual = pdf( data );
		assert.notEqual( actual, data );
		assert.isTrue( deepCloseTo( actual, expected, 1e-15 ) );

		// Mutate:
		actual = pdf( data, {
			'copy': false
		});
		expected = new Int8Array( [1,0,0,0,0] );
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should evaluate the probability density function and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ 0, 0.5, 1, 1.5, 2 ];
		expected = new Int8Array( [ 1, 0, 0, 0, 0 ] );

		actual = pdf( data, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should evaluate the probability density function using an accessor', function test() {
		var data, actual, expected;

		data = [
			[0,0],
			[1,0.5],
			[2,1],
			[3,1.5],
			[4,2]
		];
		expected = [
			1,
			0.6065306597126334,
			0.3678794411714423,
			0.2231301601484298,
			0.1353352832366127
		];

		actual = pdf( data, {
			'accessor': getValue
		});
		assert.notEqual( actual, data );
		assert.isTrue( deepCloseTo( actual, expected, 1e-15 ) );

		// Mutate:
		actual = pdf( data, {
			'accessor': getValue,
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.isTrue( deepCloseTo( data, expected, 1e-15 ) );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should evaluate the probability density function and deep set', function test() {
		var data, actual, expected;

		data = [
			{'x':[0,0]},
			{'x':[1,0.5]},
			{'x':[2,1]},
			{'x':[3,1.5]},
			{'x':[4,2]}
		];
		expected = [
			{'x':[0,1]},
			{'x':[1,0.6065306597126334]},
			{'x':[2,0.3678794411714423]},
			{'x':[3,0.2231301601484298]},
			{'x':[4,0.1353352832366127]}
		];

		actual = pdf( data, {
			'path': 'x.1'
		});
		assert.strictEqual( actual, data );
		assert.isTrue( deepCloseTo( actual, expected, 1e-15 ) );

		// Specify a path with a custom separator...
		data = [
			{'x':[0,0]},
			{'x':[1,0.5]},
			{'x':[2,1]},
			{'x':[3,1.5]},
			{'x':[4,2]}
		];

		actual = pdf( data, {
			'path': 'x/1',
			'sep': '/'
		});
		assert.strictEqual( actual, data );
		assert.isTrue( deepCloseTo( actual, expected, 1e-15 ) );
	});

	it( 'should evaluate the probability density function when provided a matrix', function test() {
		var mat,
			out,
			d1,
			d2,
			d3,
			i;

		d1 = new Int16Array( 6 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i * 0.5;
		}
		d2 = new Float64Array([
			1,
			1,
			0.3678794411714423,
			0.3678794411714423,
			0.1353352832366127,
			0.1353352832366127
		]);

		d3 = new Int16Array([1,1,0,0,0,0]);

		mat = matrix( d1, [3,2], 'int16' );
		out = pdf( mat );

		assert.isTrue( deepCloseTo( out.data, d2, 1e-15 ) );

		// Mutate...
		out = pdf( mat, {
			'copy': false
		});
		assert.strictEqual( mat, out );
		assert.deepEqual( mat.data, d3 );
	});

	it( 'should evaluate the probability density function and return a matrix of a specific type', function test() {
		var mat,
			out,
			d1,
			d2,
			i;

		d1 = new Int16Array( 6 );
		for ( i = 0; i < d1.length; i++ ) {
			d1[ i ] = i * 0.5;
		}
		d2 = new Float32Array([
			1,
			1,
			0.3678794411714423,
			0.3678794411714423,
			0.1353352832366127,
			0.1353352832366127
		]);

		mat = matrix( d1, [3,2], 'int16' );
		out = pdf( mat, {
			'dtype': 'float32'
		});

		assert.strictEqual( out.dtype, 'float32' );
		assert.isTrue( deepCloseTo( out.data, d2, 1e-9 ) );
	});

	it( 'should return an empty data structure if provided an empty data structure', function test() {
		assert.deepEqual( pdf( [] ), [] );
		assert.deepEqual( pdf( matrix( [0,0] ) ).data, new Float64Array() );
		assert.deepEqual( pdf( new Int8Array() ), new Float64Array() );
	});

});
