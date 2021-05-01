/**
 * Stores a four dimensional vector
 */
export default class Vector4 extends Float32Array {

	/**
     * Create a four dimensional vector
     * @param {Number} x - The x component
     * @param {Number} y - The y component
     * @param {Number} z - The z component
     * @param {Number} w - The w component
     */
	constructor(x, y, z, w) {
		super(x, y, z, w);
	}

	/**
     * Create a clone of the vector
     * @returns {Vector4} the cloned vector
     */
	get () {
		return new Vector4(this[0], this[1], this[2], this[3]);
	}

	/**
     * Set the values of the four dimensional vector
     * @param {Number} x - The x component
     * @param {Number} y - The y component
     * @param {Number} z - The z component
     * @param {Number} w - The w component
     * @returns {Vector4} reference to original
     */
	set (x, y, z, w) {
		this[0] = x;
		this[1] = y;
		this[2] = z;
		this[3] = w;
		return this;
	}

	/**
     * Compute the dot product between this and another vector
     * @param {Vector4} that - The other vector
     * @returns {Number} the dot product
     */
	dot (that) {
		return this[0] * that[0] + this[1] * that[1] + this[2] * that[2] + this[3] * that[3];
	}

	/**
     * Compute the length of a vector
     * @returns {Number} the length
     */
	length () {
		return Math.hypot(this[0], this[1], this[2], this[3]);
	}

}