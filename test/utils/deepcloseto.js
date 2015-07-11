'use strict';

// ref: https://github.com/substack/node-deep-equal/blob/master/index.js
// ref: https://github.com/Jam3/array-almost-equal/blob/master/index.js
// ref: https://github.com/scijs/almost-equal/blob/master/almost_equal.js

// MODULES //


// FUNCTIONS //

/**
* FUNCTION: closeTo( x, y, eps )
*	Validates if two input values `x` and `y` are equal within an acceptable tolerance.
*
* @private
* @param {Number} x - input value
* @param {Number} y - input value
* @returns {Boolean} boolean indicating whether the inputs are equal to within an acceptable tolerance
*/
function closeTo( x, y, eps ) {
	var delta = x - y;
	if ( delta < 0 ) {
		delta = -delta;
	}
	return ( delta <= eps );
} // end FUNCTION closeTo()


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
	var keys,
		bool,
		key,
		len,
		i;

	if ( typeof x !== 'object' ) {
		if ( typeof x === 'number' && typeof y === 'number' ) {
			return closeTo( x, y, eps );
		}
		return x === y;
	}
	if ( typeof y !== 'object' ) {
		return false;
	}
	keys = Object.keys( x );
	len = keys.length;
	if ( Object.keys( y ).length !== len ) {
		return false;
	}
	for ( i = 0; i < len; i++ ) {
		key = keys[ i ];
		bool = deepCloseTo( x[ key ], y[ key ], eps );
		if ( bool === false ) {
			return false;
		}
	}
	return true;
} // end FUNCTION deepCloseTo()


// EXPORTS //

module.exports = deepCloseTo;
