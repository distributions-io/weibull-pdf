/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	pdf = require( './../lib/deepset.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'deepset pdf', function tests() {

	var lambda = 1,
		k = 1.5;

	it( 'should export a function', function test() {
		expect( pdf ).to.be.a( 'function' );
	});

	it( 'should evaluate the probability density function and deep set', function test() {
		var data, expected;

		data = [
			{'x':0},
			{'x':0.5},
			{'x':1},
			{'x':1.5},
			{'x':2},
			{'x':2.5}
		];

		data = pdf( data, lambda, k, 'x' );
		expected = [
			{'x':0},
			{'x':0},
			{'x':0},
			{'x':0},
			{'x':0},
			{'x':0}
		];

		assert.deepEqual( data, expected );

		// Custom separator...
		data = [
			{'x':[9,0]},
			{'x':[9,0.5]},
			{'x':[9,1]},
			{'x':[9,1.5]},
			{'x':[9,2]},
			{'x':[9,2.5]}
		];

		data = pdf( data, lambda, k, 'x/1', '/' );
		expected = [
			{'x':[9,0]},
			{'x':[9,0]},
			{'x':[9,0]},
			{'x':[9,0]},
			{'x':[9,0]},
			{'x':[9,0]}
		];

		assert.deepEqual( data, expected, 'custom separator' );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( pdf( [], lambda, k, 'x' ), [] );
		assert.deepEqual( pdf( [], lambda, k, 'x', '/' ), [] );
	});

	it( 'should handle non-numeric values by setting the element to NaN', function test() {
		var data, actual, expected;

		data = [
			{'x':true},
			{'x':null},
			{'x':[]},
			{'x':{}}
		];
		actual = pdf( data, lambda, k, 'x' );

		expected = [
			{'x':NaN},
			{'x':NaN},
			{'x':NaN},
			{'x':NaN}
		];

		assert.deepEqual( data, expected );
	});

});
