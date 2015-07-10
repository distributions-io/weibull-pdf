'use strict';

// ref: https://github.com/substack/node-deep-equal/blob/master/index.js
// ref: https://github.com/Jam3/array-almost-equal/blob/master/index.js
// ref: https://github.com/scijs/almost-equal/blob/master/almost_equal.js

// MODULES //


// DEEP CLOSE TO //

/**
* FUNCTION: deepCloseTo( x, y, eps )
*	Validates if two input values `x` and `y` are equal to within an acceptable tolerance using a recursive algorithm. For objects, properties having numeric values are considered acceptably equal if the values differ by less than an allowable tolerance (epsilon).
*
* @param {*} x - input value
* @param {*} y - input value
* @param {Number} eps - epsilon
* @returns {Boolean} boolean indicating whether the inputs are recursively equal to within an acceptable tolerance
*/
function deepCloseTo( x, y, eps ) {
	var len = x.length,
		delta,
		i;

	if ( y.length !== len ) {
		return false;
	}
	for ( i = 0; i < len; i++ ) {
		delta = x[ i ] - y[ i ];
		if ( delta < 0 ) {
			delta = -delta;
		}
		if ( delta > eps ) {
			return false;
		}
	}
	return true;
} // end FUNCTION deepCloseTo()


// EXPORTS //

module.exports = deepCloseTo;
