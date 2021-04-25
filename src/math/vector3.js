/**
 * Stores a three dimensional vector
 */
export class Vector3 {

	/**
	 * Create a new three dimensional vector
	 * @param {Number} x - The x component
	 * @param {Number} y - The y component
	 * @param {Number} z - The z component
	 */
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	/**
	 * Create a clone of the vector
	 * @returns {ThisType} a clone
	 */
	get () {
		return new Vector3(this.x, this.y, this.z);
	}

	/**
	 * Add a vector to this vector
	 * @param {Vector3} that - The vector to add
	 * @returns {ThisType} reference to original
	 */
	add (that) {
		this.x += that.x;
		this.y += that.y;
		this.z += that.z;
		return this;
	}

	/**
	 * Subtract a vector from
	 * @param {Vector3} that - The vector to subtract
	 * @returns {ThisType} reference to original
	 */
	sub (that) {
		this.x -= that.x;
		this.y -= that.y;
		this.z -= that.z;
		return this;
	}

	/**
	 * Scale a vector by some factor
	 * @param {Number} factor - The amount to scale
	 * @returns {ThisType} reference to original
	 */
	scl (factor) {
		this.x *= factor;
		this.y *= factor;
		this.z *= factor;
		return this;
	}

	/**
	 * Same as scl, but with a vector instead of a scalar
	 * @param {Vector3} that - The amount to scale
	 * @returns {ThisType} reference to original
	 */
	sclVec (that) {
		this.x *= that.x;
		this.y *= that.y;
		this.z *= that.z;
		return this;
	}

	/**
	 * Calculate the length of a vector
	 * @returns {Number} the computed length
	 */
	length () {
		return Math.hypot(this.x, this.y, this.z);
	}

	/**
	 * Normalize a vector
	 * @returns {ThisType} the normalized vector
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
		return this.x * that.x + this.y * that.y + this.z * that.z;
	}

	/**
	 * Compute the cross product with another vector
	 * @param {Vector3} that - The other vector
	 * @returns {ThisType} reference to original
	 */
	cross (that) {
		let x = this.y * that.z - this.z * that.y;
		let y = this.z * that.x - this.x * that.z;
		let z = this.x * that.y - this.y * that.x;
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}


}