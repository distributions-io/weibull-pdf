/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	pdf = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array pdf', function tests() {

	var lambda = 2,
		k = 3;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the probability density function', function test() {
		var data, actual, expected;

		data = [ 0, 0.5, 1, 1.5, 2, 2.5];
		actual = new Array( data.length );

		actual = pdf( actual, data, lambda, k );
		expected = [ 0, 0.09229654, 0.3309363, 0.5533448, 0.5518192, 0.3324144 ];

		assert.isTrue( deepCloseTo( actual, expected, 1e-7 ) );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pdf( [], [], lambda, k ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [ true, null, [], {} ];
		actual = new Array( data.length );
		actual = pdf( actual, data, lambda, k );

		expected = [ NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );
	});

});
