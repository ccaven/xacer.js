import Program from "./program.js";

/**
 * material class which holds all the textures and shaders that will be used to render the object
 */
export default class Material {
	/**
	 * creates a new materil
	 * @param {WebGLRenderingContext} gl webgl rendering context that will be used to do webgl operations
	 * @param {ProgramType} type program type which will be used to create the material
	 */
	constructor(gl, type) {
		this.gl = gl;
		this.program = new Program(gl, type);
		this.attribs = {};
		this.uniforms = {};
		this.setAttribLocations();
		this.setUniformLocations();
	}

	/* currently unused and has no plan of being used but still here since I might need it later */
	setAttribLocations() {
		const gl = this.gl;
		const program = this.program;
		const numAttribs = program.getProgramParameter(gl.ACTIVE_ATTRIBUTES);
		for (let i = 0; i < numAttribs; i++) {
			const info = program.getActiveAttrib(i);
			this.attribs[info.name] = program.getAttribLocation(info.name);
		}
	}

	setUniformLocations() {
		const gl = this.gl;
		const program = this.program;
		const numAttribs = program.getProgramParameter(gl.ACTIVE_UNIFORMS);
		for (let i = 0; i < numAttribs; i++) {
			const info = program.getActiveUniform(i);
			this.uniforms[info.name] = program.getUniformLocation(info.name);
		}
	}
}