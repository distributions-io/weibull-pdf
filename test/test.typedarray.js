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

describe( 'typed-array pdf', function tests() {

	var lambda = 4,
		k = 3.21;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the probability density function', function test() {
		var data, actual, expected;

		data = new Int32Array( [ 1, 2, 3, 4, 5 ] );
		actual = new Float64Array( data.length );

		actual = pdf( actual, data, lambda, k );
		expected = new Float64Array( [
			0.03705275867645935,
			0.1556810607472769,
			0.2856626901113773,
			0.2952232515400824,
			0.1697033786940394
		]);

		assert.isTrue( deepCloseTo( actual, expected, 1e-15 ) );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pdf( new Int8Array(), new Int8Array(), lambda, k ), new Int8Array() );
	});

});
