
import { Vector3 } from "../math/vector3.js";

import { Quat } from "../math/quat.js";

import { Matrix4 } from "../math/mat4.js";

/**
 * Represents a position, rotation, and scale of an object
 */
export class Transform {

	/**
	 * Create a new Transform object
	 */
	constructor () {
		this.position = new Vector3(0, 0, 0);
		this.rotation = new Quat(1, 0, 0, 0);
		this.scale = new Vector3(1, 1, 1);

		this.model = new Matrix4();
	}

	constructModelMatrix () {
		return this.model.fromRotationTranslationScale(this.rotation, this.position, this.scale);
	}
}
