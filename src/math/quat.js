// I need to import for the type definition but not for the class itself.
import Vector3 from "./vector3"; // eslint-disable-line no-unused-vars

export default class Quat extends Float32Array {
	/**
	 * Create a quaternion from its four basic components, the scalar component
	 * and the three imaginary components.
	 * @param {Number} scalar - Scalar component
	 * @param {Number} i - I component
	 * @param {Number} j - J component
	 * @param {Number} k - K component
	 */
	constructor(scalar, i, j, k) {
		super([ scalar, i, j, k ]);
	}

	/**
	 * Create a quaternion using an axis and angle
	 * @param {Vector3} axis - Axis of rotation
	 * @param {Number} angle - Amount to rotate by around axis in radians
	 * @returns {Quat} New quaternion
	 */
	static fromAxisAngle(axis, angle) {
		const sin = Math.sin(angle / 2);
		const normalizedAxis = axis.get().normalize();
		return new Quat(
			Math.cos(angle / 2),
			normalizedAxis.x * sin,
			normalizedAxis.y * sin,
			normalizedAxis.z * sin,
		);
	}

	/**
	 * Create a quaternion from an array. The elements of the array
	 * must represent, in order, the scalar component, the I component,
	 * the J component, and finally the K component.
	 * @param {Number[]} components - Array of quaternion components
	 * @returns {Quat} New quaternion
	 */
	static fromArray(components) {
		return Quat.from(components);
	}

	/**
	 * Multiply this quaternion by that
	 * @param {Quat} that - Quaternion on right hand side of multiplication
	 * @returns {Quat} Quaternion product
	 */
	mult(that) {
		return new Quat(
			this[0] * that[0] - this[1] * that[1] - this[2] * that[2] - this[3] * that[3],
			this[0] * that[1] + this[1] * that[0] + this[2] * that[3] - this[3] * that[2],
			this[0] * that[2] - this[1] * that[3] + this[2] * that[0] + this[3] * that[1],
			this[0] * that[3] + this[1] * that[2] - this[2] * that[1] + this[3] * that[0],
		);
	}

	/**
	 * Calculate the conjugate of this quaternion
	 * For unit quaternions, the conjugate is the same as the inverse
	 * @returns {Quat} The conjugate
	 */
	conjugate() {
		return new Quat(this[0], -this[1], -this[2], -this[3]);
	}

	/**
	 * Rotate a vector by this quaternion
	 * @param {Vector3} vector - The vector to rotate
	 * @returns {Vector3} - A new rotated vector
	 */
	rotateVector(vector) {
		const vectorAsQuat = new Quat(0, vector.x, vector.y, vector.z);
		const rotatedQuat = this.mult(vectorAsQuat).mult(this.conjugate());
		return new Vector3(rotatedQuat[1], rotatedQuat[2], rotatedQuat[3]);
	}
}
