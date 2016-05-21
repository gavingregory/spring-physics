/**
 * Represents a spring.
 * @constructor
 * @param {Object} a - An Entity object representing position. Optional.
 * @param {Object} b - The mass of the object.
 * @param {Number} resistance - The resistance of the spring.
 * @param {Number} length - The length of the spring.
 */
var Spring = function (a, b, resistance, length) {
  this.a = a;
  this.b = b;
  this.resistance = resistance;
  this.length = length;
};

module.exports = Spring;
