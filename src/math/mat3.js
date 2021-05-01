
/**
 * The Matrix3 class holds a 3x3 matrix
 */
export default class Matrix3 extends Float32Array {

	/**
     * Create an identity 3x3 matrix
     */
	constructor() {
		super(1, 0, 0, 0, 1, 0, 0, 0, 1);
	}

	/**
     * Create a clone of the matrix
     * @returns {Matrix3} the clone
     */
	get () {
		let m = new Matrix3();
		m.set(this);
		return m;
	}

	/**
     * Set the values of a matrix
     * @param {Number} x0 - The x component of the first column
     * @param {Number} x1 - The x component of the second column
     * @param {Number} x2 - The x component of the third column
     * @param {Number} y0 - The y component of the first column
     * @param {Number} y1 - The y component of the second column
     * @param {Number} y1 - The y component of the third column
     * @param {Number} z0 - The z component of the first column
     * @param {Number} z1 - The z component of the second column
     * @param {Number} z2 - The z component of the third column
     * @returns {Matrix3} reference to original
     */
	setValues(x0, x1, x2, y0, y1, y2, z0, z1, z2) {
		this[0] = x0;
		this[1] = x1;
		this[2] = x2;
		this[3] = y0;
		this[4] = y1;
		this[5] = y2;
		this[6] = z0;
		this[7] = z1;
		this[8] = z2;
		return this;
	}

	/**
     * Multiply this matrix by another matrix
     * @param {Matrix3} that - The matrix to multiply by
     * @returns {Matrix3} reference to original
     */
	mul (that) {
		let a00 = this[0],
			a01 = this[1],
			a02 = this[2];
		let a10 = this[3],
			a11 = this[4],
			a12 = this[5];
		let a20 = this[6],
			a21 = this[7],
			a22 = this[8];
		let b00 = that[0],
			b01 = that[1],
			b02 = that[2];
		let b10 = that[3],
			b11 = that[4],
			b12 = that[5];
		let b20 = that[6],
			b21 = that[7],
			b22 = that[8];
		this[0] = b00 * a00 + b01 * a10 + b02 * a20;
		this[1] = b00 * a01 + b01 * a11 + b02 * a21;
		this[2] = b00 * a02 + b01 * a12 + b02 * a22;
		this[3] = b10 * a00 + b11 * a10 + b12 * a20;
		this[4] = b10 * a01 + b11 * a11 + b12 * a21;
		this[5] = b10 * a02 + b11 * a12 + b12 * a22;
		this[6] = b20 * a00 + b21 * a10 + b22 * a20;
		this[7] = b20 * a01 + b21 * a11 + b22 * a21;
		this[8] = b20 * a02 + b21 * a12 + b22 * a22;
		return this;
	}

}
