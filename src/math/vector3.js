/**
 * Stores a three dimensional vector
 */
export class Vector3 extends Float32Array{

	/**
	 * Create a new three dimensional vector
	 * @param {Number} x - The x component
	 * @param {Number} y - The y component
	 * @param {Number} z - The z component
	 */
	constructor(x, y, z) {
		super(x, y, z);
	}

	/**
	 * Create a clone of the vector
	 * @returns {Vector3} a clone
	 */
	get () {
		return new Vector3(this[0], this[1], this[2]);
	}

	/**
	 * Add a vector to this vector
	 * @param {Vector3} that - The vector to add
	 * @returns {Vector3} reference to original
	 */
	add (that) {
		this[0] += that[0];
		this[1] += that[1];
		this[2] += that[2];
		return this;
	}

	/**
	 * Subtract a vector from
	 * @param {Vector3} that - The vector to subtract
	 * @returns {Vector3} reference to original
	 */
	sub (that) {
		this[0] -= that[0];
		this[1] -= that[1];
		this[2] -= that[2];
		return this;
	}

	/**
	 * Scale a vector by some factor
	 * @param {Number} factor - The amount to scale
	 * @returns {Vector3} reference to original
	 */
	scl (factor) {
		this[0] *= factor;
		this[1] *= factor;
		this[2] *= factor;
		return this;
	}

	/**
	 * Same as scl, but with a vector instead of a scalar
	 * @param {Vector3} that - The amount to scale
	 * @returns {Vector3} reference to original
	 */
	sclVec (that) {
		this[0] *= that[0];
		this[1] *= that[1];
		this[2] *= that[2];
		return this;
	}

	/**
	 * Calculate the length of a vector
	 * @returns {Number} the computed length
	 */
	length () {
		return Math.hypot(this[0], this[1], this[2]);
	}

	/**
	 * Normalize a vector
	 * @returns {Vector3} the normalized vector
	 */
	normalize () {
		return this.scl(1 / this.length());
	}

	/**
	 * Calculate the dot product with another vector
	 * @param {Vector3} that - The other vector
	 * @returns {Number} the computed dot product
	 */
	dot (that) {
		return this[0] * that[0] + this[1] * that[1] + this[2] * that[2];
	}

	/**
	 * Compute the cross product with another vector
	 * @param {Vector3} that - The other vector
	 * @returns {Vector3} reference to original
	 */
	cross (that) {
		let x = this[1] * that[2] - this[2] * that[1];
		let y = this[2] * that[0] - this[0] * that[2];
		let z = this[0] * that[1] - this[1] * that[0];
		this[0] = x;
		this[1] = y;
		this[2] = z;
		return this;
	}


}