import Material from "./material.js";
import Mesh from "./mesh.js";

export default class Object {
	constructor(mesh, material) {
		this.mesh = mesh;
		this.material = material;
	}

	init(gl) {
		this.mesh = new Mesh(gl);
		this.material = new Material(gl);
	}

	get buffers() {
		return this.mesh.buffers;
	}

	get indexBuffer() {
		return this.mesh.indexBuffer;
	}
}