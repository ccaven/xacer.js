import Shader from './shader.js';

/**
 * wrapper class for webgl program
 */
export default class Program {
	/**
	 * creates a new program from given parameters
	 * @param {WebGLRenderingContext} gl rendering context used to do webgl operations
	 * @param {ProgramType} type type of program that this object represents
	 */
	constructor(gl, type) {
		this.gl = gl;
		const fs = new Shader(gl, 'fs', type);
		const vs = new Shader(gl, 'vs', type);

		const program = gl.createProgram();

		gl.attachShader(program, fs.shader);
		gl.attachShader(program, vs.shader);
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error('Link failed: ' + gl.getProgramInfoLog(program));
			console.error('vs info-log: ' + gl.getShaderInfoLog(vs.shader));
			console.error('fs info-log: ' + gl.getShaderInfoLog(fs.shader));
		}

		this.program = program;

		this.vao = gl.createVertexArray();
	}

	/**
	 * sets up the VAO for this program
	 * @param {[BufferInfo]} buffers array of buffers to make the VAO out of
	 */
	setupVAO(buffers) {
		const gl = this.gl;
		gl.bindVertexArray(this.vao);
		for (const name in buffers) {
			const bufferInfo = buffers[name];
			if (name === 'indices') {
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferInfo.buffer);
			} else {
				gl.bindBuffer(gl.ARRAY_BUFFER, bufferInfo.buffer);
				gl.vertexAttribPointer(this.getAttribLocation(name), bufferInfo.size, gl.FLOAT, false, 0, 0);
				gl.enableVertexAttribArray(name);
			}
		}
	}

	/**
	 * gets attribute's location
	 * @param {String} attribName attribute name
	 */
	getAttribLocation(attribName) {
		return this.gl.getAttribLocation(this.program, attribName);
	}

	/**
	 * gets active attributes from an index
	 * @param {Number} index index of the given attribute
	 */
	getActiveAttrib(index) {
		return this.gl.getActiveAttrib(this.program, index);
	}

	/**
	 * gets uniform's location
	 * @param {String} uniformName uniform name
	 */
	getUniformLocation(uniformName) {
		return this.gl.getUniformLocation(this.program, uniformName);
	}

	/**
	 * gets active uniform from an index
	 * @param {Number} index index of the given uniform
	 */
	getActiveUniform(index) {
		return this.gl.getActiveUniform(this.program, index);
	}

	/**
	 * gets a program patameter for given input
	 * @param {Number} parameter one of the gl.*.
	 */
	getProgramParameter(parameter) {
		return this.gl.getProgramParameter(this.program, parameter);
	}

	/**
	 * use this program. use as in webgl sense
	 */
	use() {
		this.gl.useProgram(this.program);
	}
}