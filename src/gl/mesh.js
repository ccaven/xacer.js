const primitives = {
	cube: {
		position: [
			// Front face
			-1.0, -1.0,  1.0,
			 1.0, -1.0,  1.0,
			 1.0,  1.0,  1.0,
			-1.0,  1.0,  1.0,

			// Back face
			-1.0, -1.0, -1.0,
			-1.0,  1.0, -1.0,
			 1.0,  1.0, -1.0,
			 1.0, -1.0, -1.0,

			// Top face
			-1.0,  1.0, -1.0,
			-1.0,  1.0,  1.0,
			 1.0,  1.0,  1.0,
			 1.0,  1.0, -1.0,

			// Bottom face
			-1.0, -1.0, -1.0,
			 1.0, -1.0, -1.0,
			 1.0, -1.0,  1.0,
			-1.0, -1.0,  1.0,

			// Right face
			1.0, -1.0, -1.0,
			1.0,  1.0, -1.0,
			1.0,  1.0,  1.0,
			1.0, -1.0,  1.0,

			// Left face
			-1.0, -1.0, -1.0,
			-1.0, -1.0,  1.0,
			-1.0,  1.0,  1.0,
			-1.0,  1.0, -1.0,
		],
		uvs: [
			// Front
			0.0,  0.0,
			1.0,  0.0,
			1.0,  1.0,
			0.0,  1.0,
			// Back
			0.0,  0.0,
			1.0,  0.0,
			1.0,  1.0,
			0.0,  1.0,
			// Top
			0.0,  0.0,
			1.0,  0.0,
			1.0,  1.0,
			0.0,  1.0,
			// Bottom
			0.0,  0.0,
			1.0,  0.0,
			1.0,  1.0,
			0.0,  1.0,
			// Right
			0.0,  0.0,
			1.0,  0.0,
			1.0,  1.0,
			0.0,  1.0,
			// Left
			0.0,  0.0,
			1.0,  0.0,
			1.0,  1.0,
			0.0,  1.0,
		],
		indices: [
			0,  1,  2,      0,  2,  3,    // front
			4,  5,  6,      4,  6,  7,    // back
			8,  9,  10,     8,  10, 11,   // top
			12, 13, 14,     12, 14, 15,   // bottom
			16, 17, 18,     16, 18, 19,   // right
			20, 21, 22,     20, 22, 23,   // left
		],
	},
};

/**
 * a class representing a mesh. contains all the buffers and related infos
 */
export default class Mesh {
	/**
	 * creates a new mesh from given object type
	 * @param {WebGLRenderingContext} gl rendering context used to do webgl operations
	 * @param {ObjectType} type type used to create the mesh
	 */
	constructor(gl, type) {
		this.gl = gl;
		this.buffers = {};
		this.setup(type);
	}

	/**
	 * sets up all the needed buffers
	 * @param {ObjectType} type type of object to be created
	 */
	setup(type) {
		this.makeBuffer({ data: primitives[type].position, size: 3 }, "aVertexPosition");
		this.makeBuffer({ data: primitives[type].uvs, size: 2 }, "aTextureCoord");
		this.makeBuffer({ data: primitives[type].indices }, "indices");
	}

	/**
	 *
	 * @param {BufferInfo} info information of the buffer
	 * @param {String} name name of the buffer. this will also be used as a attribute name when assigning to a attribute
	 */
	makeBuffer(info, name) {
		const gl = this.gl;
		const buffer = gl.createBuffer();
		if (name === "indices") {
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(info.data), gl.STATIC_DRAW);
		} else {
			gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(info.data), gl.STATIC_DRAW);
		}
		info.buffer = buffer;
		this.buffers[name] = info;
	}
}