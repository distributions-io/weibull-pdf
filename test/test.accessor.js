/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	pdf = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor pdf', function tests() {

	var lambda = 1,
		k = 1;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the probability density function using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':0},
			{'x':0.5},
			{'x':1},
			{'x':1.5},
			{'x':2},
			{'x':2.5}
		];
		actual = new Array( data.length );

		actual = pdf( actual, data, lambda, k, getValue );
		expected = [
			1,
			0.6065306597126334,
			0.3678794411714423,
			0.2231301601484298,
			0.1353352832366127,
			0.0820849986238988
		];

		assert.isTrue( deepCloseTo( actual, expected, 1e-15 ) );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pdf( [], [], lambda, k, getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = new Array( data.length );
		actual = pdf( actual, data, lambda, k, getValue );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

});
