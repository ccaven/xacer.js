import Quat from "./quat";
import Vector3 from "./vector3";

/**
 * Stores a 4x4 matrix
 */
export default class Matrix4 extends Float32Array {

	/**
     * Create a new identity matrix
     */
	constructor() {
		super(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		);
	}

	/**
     * Create a clone of the matrix
     * @returns {Matrix4} the clone
     */
	get () {
		let m = new Matrix4();
		m.set(this);
		return m;
	}

	/**
     * Set the values of the 4x4 matrix
     * @param {Number} x0 - The x component of the first column
     * @param {Number} x1 - The x component of the second column
     * @param {Number} x2 - The x component of the third column
     * @param {Number} x3 - The x component of the fourth column
     * @param {Number} y0 - The y component of the first column
     * @param {Number} y1 - The y component of the second column
     * @param {Number} y2 - The y component of the third column
     * @param {Number} y3 - The y component of the fourth column
     * @param {Number} z0 - The z component of the first column
     * @param {Number} z1 - The z component of the second column
     * @param {Number} z2 - The z component of the third column
     * @param {Number} z3 - The z component of the fourth column
     * @param {Number} w0 - The w component of the first column
     * @param {Number} w1 - The w component of the second column
     * @param {Number} w2 - The w component of the third column
     * @param {Number} w3 - The w component of the fourth column
     * @returns
     */
	fromValues (x0, x1, x2, x3, y0, y1, y2, y3, z0, z1, z2, z3, w0, w1, w2, w3) {
		this[0] = x0;
		this[1] = x1;
		this[2] = x2;
		this[3] = x3;

		this[4] = y0;
		this[5] = y1;
		this[6] = y2;
		this[7] = y3;

		this[8] = z0;
		this[9] = z1;
		this[10] = z2;
		this[11] = z3;

		this[12] = w0;
		this[13] = w1;
		this[14] = w2;
		this[15] = w3;

		return this;
	}

	/**
     * Multiply two matrices
     * @param {Matrix4} that - The matrix to multiply by
     * @returns {Matrix4} reference to original
     */
	mul (that) {
		let a00 = this[0],
			a01 = this[1],
			a02 = this[2],
			a03 = this[3];
		let a10 = this[4],
			a11 = this[5],
			a12 = this[6],
			a13 = this[7];
		let a20 = this[8],
			a21 = this[9],
			a22 = this[10],
			a23 = this[11];
		let a30 = this[12],
			a31 = this[13],
			a32 = this[14],
			a33 = this[15];
		// Cache only the current line of the second matrix
		let b0 = that[0],
			b1 = that[1],
			b2 = that[2],
			b3 = that[3];
		this[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		this[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		this[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		this[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		b0 = that[4];
		b1 = that[5];
		b2 = that[6];
		b3 = that[7];

		this[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		this[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		this[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		this[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		b0 = that[8];
		b1 = that[9];
		b2 = that[10];
		b3 = that[11];

		this[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		this[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		this[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		this[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		b0 = that[12];
		b1 = that[13];
		b2 = that[14];
		b3 = that[15];

		this[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		this[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		this[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		this[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
		return this;
	}

	/**
     * Transpose a 4x4 matrix
     * @returns {Matrix4} reference to original
     */
	transpose () {
		let a01 = this[1],
			a02 = this[2],
			a03 = this[3];
		let a12 = this[6],
			a13 = this[7];
		let a23 = this[11];
		this[1] = this[4];
		this[2] = this[8];
		this[3] = this[12];
		this[4] = a01;
		this[6] = this[9];
		this[7] = this[13];
		this[8] = a02;
		this[9] = a12;
		this[11] = this[14];
		this[12] = a03;
		this[13] = a13;
		this[14] = a23;
		return this;
	}

	/**
     * Inverts a 4x4 matrix
     * @returns {Matrix4} reference to original
     */
	invert () {
		let a00 = this[0],
			a01 = this[1],
			a02 = this[2],
			a03 = this[3];
		let a10 = this[4],
			a11 = this[5],
			a12 = this[6],
			a13 = this[7];
		let a20 = this[8],
			a21 = this[9],
			a22 = this[10],
			a23 = this[11];
		let a30 = this[12],
			a31 = this[13],
			a32 = this[14],
			a33 = this[15];

		let b00 = a00 * a11 - a01 * a10;
		let b01 = a00 * a12 - a02 * a10;
		let b02 = a00 * a13 - a03 * a10;
		let b03 = a01 * a12 - a02 * a11;
		let b04 = a01 * a13 - a03 * a11;
		let b05 = a02 * a13 - a03 * a12;
		let b06 = a20 * a31 - a21 * a30;
		let b07 = a20 * a32 - a22 * a30;
		let b08 = a20 * a33 - a23 * a30;
		let b09 = a21 * a32 - a22 * a31;
		let b10 = a21 * a33 - a23 * a31;
		let b11 = a22 * a33 - a23 * a32;

		// Calculate the determinant
		let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

		if (!det) {
			return null;
		}

		det = 1.0 / det;

		this[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
		this[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
		this[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
		this[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
		this[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
		this[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
		this[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
		this[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
		this[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
		this[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
		this[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
		this[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
		this[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
		this[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
		this[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
		this[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
		return this;
	}

	/**
     * Calculate the adjugate of a matrix
     * @returns {Matrix4} reference to original
     */
	adjoint () {
		let a00 = this[0],
			a01 = this[1],
			a02 = this[2],
			a03 = this[3];
		let a10 = this[4],
			a11 = this[5],
			a12 = this[6],
			a13 = this[7];
		let a20 = this[8],
			a21 = this[9],
			a22 = this[10],
			a23 = this[11];
		let a30 = this[12],
			a31 = this[13],
			a32 = this[14],
			a33 = this[15];
		this[0]
            = a11 * (a22 * a33 - a23 * a32)
            - a21 * (a12 * a33 - a13 * a32)
            + a31 * (a12 * a23 - a13 * a22);
		this[1] = -(
			a01 * (a22 * a33 - a23 * a32)
            - a21 * (a02 * a33 - a03 * a32)
            + a31 * (a02 * a23 - a03 * a22)
		);
		this[2]
            = a01 * (a12 * a33 - a13 * a32)
            - a11 * (a02 * a33 - a03 * a32)
            + a31 * (a02 * a13 - a03 * a12);
		this[3] = -(
			a01 * (a12 * a23 - a13 * a22)
            - a11 * (a02 * a23 - a03 * a22)
            + a21 * (a02 * a13 - a03 * a12)
		);
		this[4] = -(
			a10 * (a22 * a33 - a23 * a32)
            - a20 * (a12 * a33 - a13 * a32)
            + a30 * (a12 * a23 - a13 * a22)
		);
		this[5]
            = a00 * (a22 * a33 - a23 * a32)
            - a20 * (a02 * a33 - a03 * a32)
            + a30 * (a02 * a23 - a03 * a22);
		this[6] = -(
			a00 * (a12 * a33 - a13 * a32)
            - a10 * (a02 * a33 - a03 * a32)
            + a30 * (a02 * a13 - a03 * a12)
		);
		this[7]
            = a00 * (a12 * a23 - a13 * a22)
            - a10 * (a02 * a23 - a03 * a22)
            + a20 * (a02 * a13 - a03 * a12);
		this[8]
            = a10 * (a21 * a33 - a23 * a31)
            - a20 * (a11 * a33 - a13 * a31)
            + a30 * (a11 * a23 - a13 * a21);
		this[9] = -(
			a00 * (a21 * a33 - a23 * a31)
            - a20 * (a01 * a33 - a03 * a31)
            + a30 * (a01 * a23 - a03 * a21)
		);
		this[10]
            = a00 * (a11 * a33 - a13 * a31)
            - a10 * (a01 * a33 - a03 * a31)
            + a30 * (a01 * a13 - a03 * a11);
		this[11] = -(
			a00 * (a11 * a23 - a13 * a21)
            - a10 * (a01 * a23 - a03 * a21)
            + a20 * (a01 * a13 - a03 * a11)
		);
		this[12] = -(
			a10 * (a21 * a32 - a22 * a31)
            - a20 * (a11 * a32 - a12 * a31)
            + a30 * (a11 * a22 - a12 * a21)
		);
		this[13]
            = a00 * (a21 * a32 - a22 * a31)
            - a20 * (a01 * a32 - a02 * a31)
            + a30 * (a01 * a22 - a02 * a21);
		this[14] = -(
			a00 * (a11 * a32 - a12 * a31)
            - a10 * (a01 * a32 - a02 * a31)
            + a30 * (a01 * a12 - a02 * a11)
		);
		this[15]
            = a00 * (a11 * a22 - a12 * a21)
            - a10 * (a01 * a22 - a02 * a21)
            + a20 * (a01 * a12 - a02 * a11);
		return this;
	}

	/**
     * Calculate the determinant of a matrix
     * @returns {Number} the determinant
     */
	determinant () {
		let a00 = this[0],
			a01 = this[1],
			a02 = this[2],
			a03 = this[3];
		let a10 = this[4],
			a11 = this[5],
			a12 = this[6],
			a13 = this[7];
		let a20 = this[8],
			a21 = this[9],
			a22 = this[10],
			a23 = this[11];
		let a30 = this[12],
			a31 = this[13],
			a32 = this[14],
			a33 = this[15];
		let b00 = a00 * a11 - a01 * a10;
		let b01 = a00 * a12 - a02 * a10;
		let b02 = a00 * a13 - a03 * a10;
		let b03 = a01 * a12 - a02 * a11;
		let b04 = a01 * a13 - a03 * a11;
		let b05 = a02 * a13 - a03 * a12;
		let b06 = a20 * a31 - a21 * a30;
		let b07 = a20 * a32 - a22 * a30;
		let b08 = a20 * a33 - a23 * a30;
		let b09 = a21 * a32 - a22 * a31;
		let b10 = a21 * a33 - a23 * a31;
		let b11 = a22 * a33 - a23 * a32;
		// Calculate the determinant
		return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	}

	/**
	 * Creates a matrix from a quaternion rotation, vector translation and vector scale
	 * @param {Quat} rotation Rotation quaternion
	 * @param {Vector3} translation Translation vector
	 * @param {Vector3} scale Scaling vector
	 * @returns {Matrix4} reference to original
	 */
	fromRotationTranslationScale (rotation, translation, scale) {
		let x = rotation[0],
			y = rotation[1],
			z = rotation[2],
			w = rotation[3];
		let x2 = x + x;
		let y2 = y + y;
		let z2 = z + z;
		let xx = x * x2;
		let xy = x * y2;
		let xz = x * z2;
		let yy = y * y2;
		let yz = y * z2;
		let zz = z * z2;
		let wx = w * x2;
		let wy = w * y2;
		let wz = w * z2;
		let sx = scale[0];
		let sy = scale[1];
		let sz = scale[2];
		this[0] = (1 - (yy + zz)) * sx;
		this[1] = (xy + wz) * sx;
		this[2] = (xz - wy) * sx;
		this[3] = 0;
		this[4] = (xy - wz) * sy;
		this[5] = (1 - (xx + zz)) * sy;
		this[6] = (yz + wx) * sy;
		this[7] = 0;
		this[8] = (xz + wy) * sz;
		this[9] = (yz - wx) * sz;
		this[10] = (1 - (xx + yy)) * sz;
		this[11] = 0;
		this[12] = translation[0];
		this[13] = translation[1];
		this[14] = translation[2];
		this[15] = 1;
		return this;
	}
}