/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pdf = require( './../lib/number.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'number pdf', function tests() {

	var lambda = 5,
		k = 2.5;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the probability density function', function test() {
		assert.strictEqual( pdf( 0, lambda, k ), 0 );
		assert.closeTo( pdf( 2.25, lambda, k ), 0.1317631, 1e-7 );
		assert.closeTo( pdf( Math.PI, lambda, k ), 0.1821106, 1e-7 );
	});

	it( 'should return `0` if provided a negative number', function test() {
		var val;

		val = pdf( -9, lambda, k );
		assert.strictEqual( val, 0 );
	});

	it( 'should evaluate the probability density function at `0`', function test() {
		var val;

		val = pdf( 0, 5, 1 );
		assert.strictEqual( val, 0.2 );

		val = pdf( 0, lambda, k );
		assert.strictEqual( val, 0 );
	});

});
