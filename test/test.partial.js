/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	partial = require( './../lib/partial.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'partial', function tests() {

	var lambda = 5,
		k = 2.5,
		pdf;

	pdf = partial( lambda, k );

	it( 'should export a function', function test() {
		expect( partial ).to.be.a( 'function' );
	});

	it( 'should return a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should return a function which evaluates the probability density function', function test() {
		assert.strictEqual( pdf( 0 ), 0 );
		assert.closeTo( pdf( 2.25 ), 0.131763075128903, 1e-15 );
		assert.closeTo( pdf( Math.PI ), 0.1821106151908609, 1e-15 );
	});

	it( 'should return a function which returns `0` if provided a negative number', function test() {
		var val = pdf( -9 );
		assert.strictEqual( val, 0 );
	});

	it( 'should return a function which evaluates the probability density function at `0`', function test() {
		var pdf, val;

		pdf = partial( lambda, k );
		val = pdf( 0 );
		assert.strictEqual( val, 0 );

		pdf = partial( 5, 1 );
		val = pdf( 0 );
		assert.strictEqual( val, 0.2 );
	});

});
