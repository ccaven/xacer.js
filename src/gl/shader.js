export default class Shader {
	constructor(gl, type, source) {
		const shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);
		this.shader = shader;
	}
}