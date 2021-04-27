import Program from "./program.js";

export default class Material {
	constructor(gl) {
		this.gl = gl;
		this.program = new Program(gl);
		this.attribs = {};
		this.uniforms = {};
		this.setAttribLocations();
		this.setUniformLocations();
	}

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