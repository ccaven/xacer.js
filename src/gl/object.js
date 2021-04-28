import Material from "./material.js";
import Mesh from "./mesh.js";

import 'https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js';

/* globals mat4 */


/**
 * a class that represents an object in 3D
 */
export default class Object3D {
	/**
	 * creates a new object from given parameters
	 * @param {ObjectType} objType type of object that this object will represent
	 * @param {ProgramType} materialType type of material that this object will have
	 */
	constructor(objType, materialType) {
		this.objType = objType;
		this.materialType = materialType;
		this.uniforms = {};
		this.rotation = 10;
	}

	/**
	 * initializes this class
	 * @param {WebGLRenderingContext} gl webgl context to do webgl operations
	 */
	init(gl) {
		this.gl = gl;
		this.mesh = new Mesh(gl, this.objType);
		this.material = new Material(gl, this.materialType);
		this.setupVAO();
	}

	/**
	 * sets up the VAO's for this object
	 */
	setupVAO() {
		this.material.program.setupVAO(this.mesh.buffers);
	}

	/**
	 * rotates the object
	 * @param {Number} rotateAmount how much to rotate the object
	 */
	rotate(rotateAmount) {
		const gl = this.gl;
		const fieldOfView = 45 * Math.PI / 180; // in radians
		const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
		const zNear = 0.1;
		const zFar = 100.0;
		const projectionMatrix = mat4.create();

		mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

		const modelViewMatrix = mat4.create();

		mat4.translate(modelViewMatrix, modelViewMatrix, [ 0.0, 0.0, -6.0 ]);
		mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotation, [ 0, 0, 1 ]);
		mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotation * 0.7, [ 0, 1, 0 ]);

		this.rotation += rotateAmount;

		this.uniforms.uProjectionMatrix = projectionMatrix;
		this.uniforms.uModelViewMatrix = modelViewMatrix;
	}

	/**
	 * renders this object
	 */
	render() {
		const gl = this.gl;
		const program = this.material.program;
		program.use();
		for (const uniformName in this.uniforms) {
			gl.uniformMatrix4fv(program.getUniformLocation(uniformName), false, this.uniforms[uniformName]);
		}
		gl.drawElements(gl.TRIANGLES, this.mesh.buffers.indices.data.length, gl.UNSIGNED_SHORT, 0);
	}
}