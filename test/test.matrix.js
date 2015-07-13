/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Deep close to:
	deepCloseTo = require( './utils/deepcloseto.js' ),

	// Module to be tested:
	pdf = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix pdf', function tests() {

	var lambda = 2,
		k = 0.5,
		out,
		mat,
		d1,
		d2,
		i;

	d1 = new Int16Array( 6 );
	for ( i = 0; i < d1.length; i++ ) {
		d1[ i ] = i * 0.5;
	}
	d2 = new Int16Array([
		Number.POSITIVE_INFINITY,
		0.3032653298563167,
		0.1743261076381756,
		0.1214225426344453,
		0.09196986029286058,
		0.07310195813396032
	]);

	beforeEach( function before() {
		mat = matrix( d1, [3,2], 'int16' );
		out = matrix( d2, [3,2], 'int16' );
	});

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			pdf( matrix( [10,10] ), mat, lambda, k );
		}
	});

	it( 'should evaluate the probability density function for each matrix element', function test() {
		var actual;

		actual = matrix( [3,2], 'int16' );
		actual = pdf( actual, mat, lambda, k );

		assert.isTrue( deepCloseTo( actual.data, out.data, 1e-15 ) );
	});

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( pdf( out, mat, lambda, k ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( pdf( out, mat, lambda, k ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( pdf( out, mat, lambda, k ).data, expected );
	});

});
